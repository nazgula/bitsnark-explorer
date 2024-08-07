import express from 'express';

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    console.log('in / - Hello, world!');
    res.send('Hello World!');
});

// Example of another route
router.get('/test', (req, res) => {
    console.log('in /test - Test route');
    res.json({ message: 'Test route' }); // Send JSON response
});

export default router;