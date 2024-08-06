import express from 'express';
import AppDataSource from './config/database';
import routes from './routes/index'; // Assuming you'll create this later for routing

const app = express();
app.use(express.json());

// Initialize the database connection
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

// Set up routes
app.use('/api', routes);
