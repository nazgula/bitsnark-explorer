import express from 'express';
import cors from 'cors'; // Import CORS
import AppDataSource from './config/db-config';
import routes from './routes/index';
import { BlockProcessingService } from './services/process-block-service';
import { BlockScheduler } from './schedulers/block-scheduler';

const app = express();
app.use(cors()); // Use CORS middleware
app.use(express.json());


AppDataSource.initialize()
    .then(async () => {
        console.log('Database connected');

        const blockProcessingService = new BlockProcessingService();
        await blockProcessingService.initialize();

        const blockScheduler = new BlockScheduler(blockProcessingService);
        blockScheduler.start();
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });

app.use('/api', routes);