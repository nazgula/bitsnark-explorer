import express from 'express';
import cors from 'cors'; // Import CORS
import AppDataSource from './config/database';
import routes from './routes/index';

const app = express();
app.use(cors()); // Use CORS middleware
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });

app.use('/api', routes);