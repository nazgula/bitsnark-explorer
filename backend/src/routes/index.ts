import express from 'express';

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Example of another route
router.get('/test', (req, res) => {
    res.send('Test route');
});

export default router;
