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
        console.log(`BlockProcessingService initialize ${blockRow}`)
        if (blockRow) {
            this.block = blockRow;
        }
        else {
            console.log(`Last processed block not found in the database: ${blockRow}`);
        }
    }

    async crawlBlocks() {
        try {
            console.log('crawlBlocks:', this.block.height, 'processing:', this.isProcessing);

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

        console.log('Processing block:', this.block.height);

        while (this.block.tx_processed < this.block.tx_count) {
            console.log(`Processing ${this.block.height} from: ${this.block.tx_processed}`);
            const newTxs = await throttle(getBlockTxsFromPos, this.block.id, this.block.tx_processed);
            await this.processBlockTxs(newTxs);
        }
    }

    async processBlockTxs(txArray: TxData[]) {
        const txArrayLength = txArray.length;

        while (txArray.length > 0) {
            console.log(`array at the begining of loop: ${txArray.length} starts with txid: ${txArray[0].txid}`);
            let blockTxIds = Array.from(
                new Set(
                    txArray.flatMap((tx, index) =>
                        tx.vin.map(vin => ({ prev_txid: vin.txid, pos: index }))
                    )
                ));

            console.log('processBlockTxs total vin ids & pos:', blockTxIds.length);

            let prevTxs = await getNoNextTxsByIds(blockTxIds);
            console.log('prevTxs.length:', prevTxs.length, prevTxs);

            if (prevTxs.length > 0) {
                console.log('$$$$$ processBlockTxs existing prevTx:', prevTxs[0]);
                const tx = txArray[prevTxs[0].pos_in_batch_array];

                console.log('processBlockTxs existing prevTx:',
                    prevTxs.length,
                    prevTxs.filter(ptx => ptx.pos_in_batch_array === prevTxs[0].pos_in_batch_array),
                    prevTxs.filter(ptx => ptx.pos_in_batch_array === prevTxs[0].pos_in_batch_array).length);

                const txPrev = prevTxs.filter(ptx => tx.vin.some(vin => vin.txid === ptx.tx_id));
                if (txPrev.length > 0) {
                    const queryRunner = await createQueryRunner();
                    try {
                        const posInBlock = this.block.tx_processed + prevTxs[0].pos_in_batch_array;
                        await processRawTxData(
                            tx,
                            prevTxs.filter(ptx => ptx.pos_in_batch_array === prevTxs[0].pos_in_batch_array),
                            posInBlock,
                            queryRunner);

                        //await this.updateBlockProcessedCount(this.block.id, posInBlock, queryRunner);
                        await queryRunner.commitTransaction();
                        //this.block.tx_processed = posInBlock;
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
                console.log(`array after splice: ${txArray.length} starts with txid: ${txArray.length ? txArray[0].txid : 'empty'}`);
            }
            else {
                txArray.splice(0, txArray.length);
            }
        }

        console.log('updateBlockProcessedCount:', this.block.tx_processed, 'to', + (this.block.tx_processed + txArrayLength));
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
