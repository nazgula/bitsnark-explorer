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

router.get('/getTx/:txid', async (req, res) => {
    const { txid } = req.params; // Extract txid from URL parameters

    try {
        // Fetch data from the external API
        const response = await fetch(`https://blockstream.info/testnet/api/tx/${txid}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert the response to JSON
        const data = await response.json();

        // Send the external API response as the response to your frontend
        res.json(data);
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});


export default router;