import AppDataSource from '../config/database';
import { Block } from '../entities/block';
import { Indentity, RawTx, TxType } from '../entities/rawTx';
import { BlockData, TxData } from '../types/blockstream';
import { QueryRunner } from 'typeorm';


export interface PrevTx {
    tx_id: string,
    tx_type: TxType,
    tx_identity: Indentity,
    interaction_id: string,
    step: number,
    pos_in_batch_array: number
}

export async function getLastProcessedBlockFromDB(): Promise<Block> {
    const result = await AppDataSource.query(
        'SELECT * FROM block ORDER BY  "height" DESC LIMIT 1');
    return result[0];
}

export async function insertProcessedBlockDB(blockData: BlockData): Promise<Block> {
    const blocksRepository = AppDataSource.getRepository(Block);
    const newBlock = new Block();
    newBlock.id = blockData.id;
    newBlock.height = BigInt(blockData.height);
    newBlock.timestamp = BigInt(blockData.timestamp);
    newBlock.tx_count = blockData.tx_count;

    const result = await blocksRepository.save(newBlock);
    console.log('Block saved:', result);
    return result
}

export async function updateProcessedBlockDB(id: string, processedCount: number): Promise<number> {
    const blocksRepository = AppDataSource.getRepository(Block);

    const updateResult = await blocksRepository.update(id, {
        tx_processed: processedCount
    });

    return updateResult.affected || 0;
}




async function getLastTxidForEachInteraction() {
    const result = await AppDataSource.query(`
        SELECT DISTINCT ON ("interaction_id") "interaction_id", 
            "step", "identity", "txid",	"p_tx_datetime",
            "tx_block_hash","response_timeout"
        FROM interaction_step
        ORDER BY "interaction_id", "step" DESC, "identity" DESC;
    `);
    return result;
}
//
export async function getNoNextTxsByIds(prevIdAndPos: { prev_txid: string, pos: number }[]): Promise<PrevTx[]> {
    const result = await AppDataSource.query(
        `SELECT "tx_id", "tx_type", "tx_identity", "interaction_id", "step",
        ${createSelectCaseOfPosByValue(prevIdAndPos)} as "pos_in_batch_array"
        FROM (
            SELECT "tx_id", "tx_type", "tx_identity" 
            FROM raw_tx  
            WHERE "has_next_tx" = false 
            AND "tx_id" = ANY($1)) as "no_next_txs"
         LEFT OUTER JOIN (
            SELECT DISTINCT ON ("interaction_id") "interaction_id", 
                "step", "txid"
            FROM interaction_step
            ORDER BY "interaction_id", "step" DESC, "identity" DESC) as "ineraction_steps"
        ON "tx_id" = "txid"
        ORDER BY "pos_in_batch_array"`, [Array.from(new Set(prevIdAndPos.map(prev => prev.prev_txid)))]);
    return result;
}

function createSelectCaseOfPosByValue(prevIdAndPos: { prev_txid: string, pos: number }[]): string {
    let selectCase = 'CASE ';
    prevIdAndPos.forEach(prev => {
        selectCase += `WHEN "tx_id" =  '${prev.prev_txid}' THEN ${prev.pos} `;
    });
    selectCase += 'END';
    return selectCase;
}

// export async function insertRawTx(txArray: TxData[], startPos: number = 0) {
//     const rawTxRepository = AppDataSource.getRepository(RawTx);
//     txArray.forEach(async (tx, index) => {
//         const newTx = new RawTx();

//         newTx.tx_id = tx.txid;
//         newTx.block_height = BigInt(tx.status.block_height);
//         newTx.pos_in_block = startPos + index;
//         // if (txId === '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309')
//         //     newTransaction.tx_type = 1;
//         // else if (txId === '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6')
//         //     newTransaction.tx_type = 2;

//         newTx.raw_data = tx;
//         newTx.processed = false;

//         const res = await rawTxRepository.save(newTx);
//         console.log(`Data fo txId ${newTx.tx_id} inserted successfully`, res);

//     });
// }


