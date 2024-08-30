// src/services/block-scheduler.ts
import cron from 'node-cron';
import { BlockProcessingService } from '../services/process-block-service';

export class BlockScheduler {
    private blockProcessingService: BlockProcessingService;

    constructor(blockProcessingService: BlockProcessingService) {
        this.blockProcessingService = blockProcessingService;
    }

    async start() {
        cron.schedule('*/1 * * * *', async () => {
            console.log('Running block processing task...');
            await this.blockProcessingService.crawlBlocks();
        });
    }
}