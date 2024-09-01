import { Interaction, InteractionStatus } from '../entities/interaction';
import { InteractionStep } from '../entities/interactionStep';
import { Indentity, RawTx, TxType } from '../entities/rawTx';
import { Tx, Vin } from '../entities/tx';
import 'reflect-metadata';
import { In, QueryRunner, Repository } from 'typeorm';
import { TxData } from '../types/blockstream';
import { PrevTx } from '../database/block-process-db';

export interface VOut {
    scriptpubkey: string,
    scriptpubkey_asm: string,
    scriptpubkey_type: string,
    scriptpubkey_address: string,
    value: number
}



// const txRepository = queryRunner.manager.getRepository(Tx);
// const tx = parseTX(raw);
// await txRepository.save(tx);


// const vinRepository = queryRunner.manager.getRepository(Vin);
// const vins: Vin[] = [];
// raw.vin.forEach((vinData) => {
//     const vin = parseVin(vinData, tx);
//     vins.push(vin);
// });
// await vinRepository.save(vins);

export async function processRawTxData(raw: TxData, prevTxData: PrevTx[], posInBlock: number, queryRunner: QueryRunner) {
    const rawTx = parseRawTX(raw, prevTxData, posInBlock);
    const prevBitsnarkTxs = await updatePrevRawTxs(rawTx, prevTxData, queryRunner);
    queryRunner.manager.save([rawTx, ...prevBitsnarkTxs])

    let interaction: Interaction;

    if (rawTx.tx_type === TxType.initial) {
        const stakeTx = prevBitsnarkTxs.filter(tx => tx.tx_type === TxType.stake)[0];
        interaction = parseNewInteraction(raw, stakeTx);
    }
    else {
        //interaction = await getInteraction(rawTx, prevTxData, queryRunner);
        interaction = new Interaction();
        interaction.interaction_id = prevTxData.filter(tx => tx.tx_type !== TxType.stake)[0].interaction_id;
        if (rawTx.tx_type === TxType.challenge) {
            const stakeTx = prevBitsnarkTxs.filter(tx => tx.tx_type === TxType.stake)[0];
            interaction.v_stake_tx = stakeTx.txid;
            interaction.v_stake_amount = getStakeAmount(stakeTx);
        }

        interaction.next_timeout = calculateNextTimeout(raw);
    }
    await queryRunner.manager.save(interaction);

    const interactionStep = saveInteractionStep(interaction.interaction_id, rawTx, prevTxData);
    await queryRunner.manager.save(interactionStep);
}

async function updatePrevRawTxs(rawTx: RawTx, prevTxData: PrevTx[], queryRunner: QueryRunner) {
    const rawTxupdates = prevTxData.map(prevTx => {
        const updateRawTx = new RawTx();
        updateRawTx.txid = prevTx.txid;
        updateRawTx.has_next_tx = true;
        if (prevTx.tx_type === TxType.stake) {
            updateRawTx.tx_identity = rawTx.tx_identity;
        }
        return updateRawTx;
    });
    // return prevTxs;
    console.log('rawTxupdates', ...rawTxupdates)
    return rawTxupdates

}


function saveInteractionStep(interaction_id: string, currentTx: RawTx, prevTxData: PrevTx[]) {
    const interactionStep = new InteractionStep();
    interactionStep.interaction_id = interaction_id;
    interactionStep.step = getInteractionStep(currentTx, prevTxData);
    interactionStep.identity = currentTx.tx_identity;
    interactionStep.txid = currentTx.txid;
    interactionStep.p_tx_datetime = BigInt((currentTx.raw_data as TxData).status.block_time);
    interactionStep.tx_block_hash = (currentTx.raw_data as TxData).status.block_hash;
    interactionStep.response_timeout = calculateNextTimeout(currentTx.raw_data as TxData);
    return interactionStep;
}

function parseRawTX(raw: TxData, prevTxData: PrevTx[], posInBlock: number) {
    const rawTx = new RawTx();
    rawTx.txid = raw.txid;
    rawTx.block_height = BigInt(raw.status.block_height);
    rawTx.pos_in_block = posInBlock;

    if (prevTxData.some(prev => prev.tx_type === TxType.initial)) {
        rawTx.tx_type = TxType.challenge;
        rawTx.tx_identity = Indentity.verifier;
    } else if (prevTxData.some(prev => prev.tx_type === TxType.stake)) {
        rawTx.tx_type = TxType.initial;
        rawTx.tx_identity = Indentity.prover;
    }
    else {
        rawTx.tx_type = TxType.step;
        rawTx.tx_identity = (prevTxData[0].tx_identity % 2) + 1 as Indentity;
    }

    rawTx.raw_data = raw;
    return rawTx;
}


function parseNewInteraction(currentTx: TxData, initialStakeTx: RawTx) {
    const interaction = new Interaction();
    interaction.interaction_id = currentTx.txid;
    interaction.total_steps = calculateTotalSteps(currentTx);
    interaction.init_datetime = BigInt(currentTx.status.block_time);
    interaction.p_stake_tx = initialStakeTx.txid;
    interaction.p_stake_amount = getStakeAmount(initialStakeTx);
    interaction.next_timeout = calculateNextTimeout(currentTx);
    interaction.status = InteractionStatus.active;
    return interaction;
}

function getInteractionStep(currentTx: RawTx, prevTxs: PrevTx[]) {
    if (currentTx.tx_type === TxType.initial || currentTx.tx_type === TxType.challenge) {
        return 0;
    }
    if (currentTx.tx_identity === Indentity.prover) return prevTxs[0].step + 1;
    else if (currentTx.tx_identity === Indentity.verifier) return prevTxs[0].step

    throw new Error(`Cannot define step for txid ${currentTx.txid}: identity ${currentTx.tx_identity} 
        step ${prevTxs[0].step} currentTx.tx_type ${currentTx.tx_type}`);
}


async function getInteraction(raw: RawTx, prevTxData: PrevTx[], queryRunner: QueryRunner) {
    const interactionRepository = queryRunner.manager.getRepository(Interaction)
    const ineraction = await interactionRepository.findOne(
        {
            where:
            {
                interaction_id:
                    prevTxData.filter
                        (tx => tx.tx_type !== TxType.stake)[0].interaction_id
            }
        });
    if (ineraction) return ineraction;
    else throw new Error(`Cannot find interaction for txid ${raw.txid}`);

}

function calculateNextTimeout(raw: any) {
    return raw.status.block_time + raw.locktime;
}

function getStakeAmount(txStake: RawTx) {
    const raw = txStake.raw_data as TxData;
    return raw.vin.reduce((acc: number, vin: any) => {
        return acc + parseInt(vin.prevout.value);
    }, 0);
}


function calculateTotalSteps(raw: any) {
    return 26;
}

function parseTX(raw: TxData) {
    const tx = new Tx();

    tx.txid = raw.txid
    tx.version = raw.version;
    tx.locktime = raw.locktime;
    tx.size = raw.size;
    tx.weight = raw.weight;
    tx.fee = raw.fee;
    tx.confirmed = raw.status.confirmed;
    tx.block_height = raw.status.block_height;
    tx.block_hash = raw.status.block_hash;
    tx.block_time = BigInt(raw.status.block_time);
    tx.vout = raw.vout;
    //@ts-ignore
    // tx.vout = raw.vout.map((vout) => {
    //     return parsevOut(vout);
    // });

    return tx;
}


function parseVin(vinData: any, tx: Tx) {
    const vin = new Vin();
    vin.tx = tx;
    vin.vin_txid = vinData.txid;
    vin.vout = vinData.vout;
    vin.scriptsig = vinData.scriptsig;
    vin.sequence = vinData.sequence;
    vin.witness = vinData.witness;
    vin.prevout = vinData.prevout;
    return vin;
}

// function parsevOut(vOutObj: VOut) {
//     return {
//         scriptpubkey: vOutObj.scriptpubkey,
//         scriptpubkey_asm: vOutObj.scriptpubkey_asm,
//         scriptpubkey_type: vOutObj.scriptpubkey_type,
//         scriptpubkey_address: vOutObj.scriptpubkey_address,
//         value: vOutObj.value
//     }
// }
