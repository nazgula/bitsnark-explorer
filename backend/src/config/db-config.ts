import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config(); // Load .env variables

const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true, // Caution in production
    logging: true,
    entities: [__dirname + '/../entities/*.ts'],
});

export default AppDataSource;
