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

router.get('/getIneractions', async (req, res) => {

    try {
        // Fetch data from the external API
        // const response = await fetch(`https://blockstream.info/testnet/api/tx/${txid}`);

        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // Convert the response to JSON
        //const data = await response.json();



        console.log('in /getIneractions - getIneractions route');

        res.json([
            { initTx: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '0', total: '6', tern: 'Prover', timeout: '12.9.23 08:40:15' },
            {
                initTx: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '4', total: '24', tern: 'Verifier', timeout: '12.8.23 05:55:15'
            }]);

        //res.json(data);

    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});


export default router;