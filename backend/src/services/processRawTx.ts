import AppDataSource from '../config/database';
import { RawTx } from '../entities/rawTx';
import { Tx, Vin } from '../entities/tx';
import 'reflect-metadata';


///rollback  if only tx passes

export interface VOut {
    scriptpubkey: string,
    scriptpubkey_asm: string,
    scriptpubkey_type: string,
    scriptpubkey_address: string,
    value: number
}

const processRawTx = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const rawtxs: string[] = [];
    try {
        //ORDER BY - should be ordered by timestamp
        const rawTxRepository: RawTx[] = await queryRunner.query('SELECT * FROM raw_tx WHERE processed = false');


        const txRepository = queryRunner.manager.getRepository(Tx);
        const vinRepository = queryRunner.manager.getRepository(Vin);

        const txs: Tx[] = [];
        const vins: Vin[] = [];



        for (const rawTx of rawTxRepository) {
            const raw = rawTx.rawData as any;
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
            tx.block_time = raw.status.block_time;
            tx.vout = raw.vout;
            //@ts-ignore
            // tx.vout = raw.vout.map((vout) => {
            //     return parsevOut(vout);
            // });

            txs.push(tx);
            //@ts-ignore
            raw.vin.forEach((vinData) => {
                const vin = new Vin();
                vin.tx = tx;
                vin.vin_tx_id = vinData.txid;
                vin.vout = vinData.vout;
                vin.scriptsig = vinData.scriptsig;
                vin.sequence = vinData.sequence;
                vin.witness = vinData.witness;

                vin.prevout = vinData.prevout;
                vins.push(vin);
            });

            rawtxs.push(rawTx.txId);
        }

        await txRepository.save(txs);
        await vinRepository.save(vins);

        //await await queryRunner.query('UPDATE raw_tx SET processed = true WHERE raw_tx.txId = ANY($1)', [rawtxs]);
        await queryRunner.commitTransaction();
    } catch (error) {
        // Rollback the transaction in case of error
        await queryRunner.rollbackTransaction();
        console.error('Transaction error:', error, rawtxs[rawtxs.length - 1]);
    } finally {
        // Release the query runner
        await queryRunner.release();
    }

};

// function parsevOut(vOutObj: VOut) {
//     return {
//         scriptpubkey: vOutObj.scriptpubkey,
//         scriptpubkey_asm: vOutObj.scriptpubkey_asm,
//         scriptpubkey_type: vOutObj.scriptpubkey_type,
//         scriptpubkey_address: vOutObj.scriptpubkey_address,
//         value: vOutObj.value
//     }
// }
function createStep() {

}

function createInteraction() {

}

AppDataSource.initialize()
    .then(() => {
        processRawTx();
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
