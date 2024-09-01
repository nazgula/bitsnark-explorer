import AppDataSource from "../config/database";
import { getBlockByHeight, getBlockTip, getBlockTxsFromPos } from "./blockstream-calls";
import { throttle } from "../middlewares/throttle";
import { processRawTxData } from './process-raw-tx';
import { getNoNextTxsByIds, getLastProcessedBlockFromDB, insertProcessedBlockDB } from '../database/block-process-db';
import { Block } from '../entities/block';
import { TxData } from '../types/blockstream';
import { createQueryRunner, rollbackTransaction } from '../database/db';
import { QueryRunner } from 'typeorm';

export class BlockProcessingService {
    private block: Block;
    private isProcessing: boolean = false;

    constructor() {
        this.block = new Block();
    }

    async initialize() {
        const blockRow = await getLastProcessedBlockFromDB();
        if (blockRow) {
            this.block = blockRow;
        }
        else {
            console.log(`Last processed block not found in the database: ${blockRow}`);
        }
    }

    async crawlBlocks() {
        try {
            if (this.isProcessing) {
                console.log(`Already processing block ${this.block.height}`);
                return;
            }

            this.isProcessing = true;
            while (this.isProcessing) {
                await this.processBlock();
            }

        } catch (error) {
            this.isProcessing = false;
            console.error('Error fetching data:', error);
        }
    }

    async processBlock() {
        if (this.block.tx_count === this.block.tx_processed) {
            await this.fetchNextBlock();
        }
        while (this.block.tx_processed < this.block.tx_count) {
            const newTxs = await throttle(getBlockTxsFromPos, this.block.id, this.block.tx_processed);
            await this.processBlockTxs(newTxs);
        }
    }

    async processBlockTxs(txArray: TxData[]) {
        const txArrayLength = txArray.length;

        while (txArray.length > 0) {
            let blockTxIds = Array.from(
                new Set(
                    txArray.flatMap((tx, index) =>
                        tx.vin.map(vin => ({ prev_txid: vin.txid, pos: index }))
                    )
                ));

            let prevTxs = await getNoNextTxsByIds(blockTxIds);

            if (prevTxs.length > 0) {
                const tx = txArray[prevTxs[0].pos_in_batch_array];

                const txPrev = prevTxs.filter(ptx => tx.vin.some(vin => vin.txid === ptx.txid));
                if (txPrev.length > 0) {
                    const queryRunner = await createQueryRunner();
                    try {
                        const posInBlock = this.block.tx_processed + prevTxs[0].pos_in_batch_array;
                        await processRawTxData(
                            tx,
                            prevTxs.filter(ptx => ptx.pos_in_batch_array === prevTxs[0].pos_in_batch_array),
                            posInBlock,
                            queryRunner);

                        await queryRunner.commitTransaction();
                    }
                    catch (error) {
                        this.isProcessing = false;
                        await rollbackTransaction(queryRunner);
                        throw error;
                    } finally {
                        await queryRunner.release();
                    }
                }

                txArray.splice(0, prevTxs[0].pos_in_batch_array + 1);
            }
            else {
                txArray.splice(0, txArray.length);
            }
        }

        this.block.tx_processed = this.block.tx_processed + txArrayLength;
        await this.updateBlockProcessedCount(this.block.id, this.block.tx_processed);
    }

    async fetchNextBlock() {
        const newBlock = await throttle(getBlockByHeight, Number(this.block.height) + 1);
        const blockRow = await insertProcessedBlockDB(newBlock);
        this.block = blockRow;
    }

    async updateBlockProcessedCount(id: string, processedCount: number, queryRunner?: QueryRunner) {
        const blocksRepository = queryRunner ? queryRunner.manager.getRepository(Block) : AppDataSource.getRepository(Block);
        const updateResult = await blocksRepository.update(id,
            { tx_processed: processedCount });
        return updateResult.affected || 0;
    }

}
