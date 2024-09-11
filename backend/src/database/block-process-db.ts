import AppDataSource from '../config/db-config';
import { Block } from '../entities/block';
import { RawTx, TxType } from '../entities/rawTx';
import { BlockData, TxData } from '../types/blockstream';
import { QueryRunner } from 'typeorm';
import { Identity } from 'bitsnark';

export interface PrevTx {
    txid: string,
    tx_type: TxType,
    tx_identity: Identity,
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


export async function getNoNextTxsByIds(prevIdAndPos: { prev_txid: string, pos: number }[]): Promise<PrevTx[]> {
    const result = await AppDataSource.query(
        `SELECT "no_next_txid" as "txid", "tx_type", "tx_identity", "interaction_id", "step",
        ${createSelectCaseOfPosByValue(prevIdAndPos)} as "pos_in_batch_array"
        FROM (
            SELECT "txid" as "no_next_txid", "tx_type", "tx_identity" 
            FROM raw_tx  
            WHERE "has_next_tx" = false 
            AND "txid" = ANY($1)) as "no_next_txs"
         LEFT OUTER JOIN (
            SELECT DISTINCT ON ("interaction_id") "interaction_id", 
                "step", "txid" as "interaction_txid"
            FROM interaction_step
            ORDER BY "interaction_id", "step" DESC, "identity" DESC) as "ineraction_steps"
        ON "no_next_txid" = "interaction_txid"
        ORDER BY "pos_in_batch_array", tx_type`, [Array.from(new Set(prevIdAndPos.map(prev => prev.prev_txid)))]);
    return result;
}

function createSelectCaseOfPosByValue(prevIdAndPos: { prev_txid: string, pos: number }[]): string {
    let selectCase = 'CASE ';
    prevIdAndPos.forEach(prev => {
        selectCase += `WHEN "no_next_txid" =  '${prev.prev_txid}' THEN ${prev.pos} `;
    });
    selectCase += 'END';
    return selectCase;
}
