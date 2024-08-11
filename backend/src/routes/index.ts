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
        res.json([
            { initTx: '2950ee83413500d3c9c77949dc96a5b9ef2ca437e6bfbd4520149acae190ea6d', step: '0', total: '6', tern: 'Verifier', timeout: '12.9.23 08:40:15' },
            { initTx: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '1', total: '8', tern: 'Prover', timeout: '12.8.23 05:55:15' },
            { initTx: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '6', total: '12', tern: 'Verifier', timeout: '11.8.23 12:02:50' }
        ]);


    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});

router.get('/getIneraction/:id', async (req, res) => {
    try {
        if (req.params.id === '2950ee83413500d3c9c77949dc96a5b9ef2ca437e6bfbd4520149acae190ea6d') {
            res.json({
                id: '2950ee83413500d3c9c77949dc96a5b9ef2ca437e6bfbd4520149acae190ea6d',
                totalsteps: '6',
                protocol: [{ id: '2950ee83413500d3c9c77949dc96a5b9ef2ca437e6bfbd4520149acae190ea6d', step: '0', pTxId: '2950ee83413500d3c9c77949dc96a5b9ef2ca437e6bfbd4520149acae190ea6d', timout: '12.9.23 08:40:15' }]
            });
        }
        else if (req.params.id === '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309') {
            res.json({
                id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309',
                totalsteps: '8',
                protocol: [
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '0', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', timout: '11.08.23 07:23:15' }]
            });
        }
        else if (req.params.id === '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc') {
            res.json({
                id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc',
                totalsteps: '12',
                protocol: [
                    { id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', pTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', vTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '0', timout: '11.08.23 07:23:15' },
                    { id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', pTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', vTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '1', timout: '11.08.23 07:23:15' },
                    { id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', pTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', vTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '2', timout: '11.08.23 07:23:15' },
                    { id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', pTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', vTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '3', timout: '11.08.23 07:23:15' },
                    { id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', pTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', vTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '4', timout: '11.08.23 07:23:15' },
                    { id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', pTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', vTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '5', timout: '11.08.23 07:23:15' },
                    { id: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', pTxId: '2811ef432a2241eadd28cb3fe4b5a8f130bcb034bb5aec10c14556b27a95e3cc', step: '6', timout: '11.08.23 07:23:15' }]
            });
        }

    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});





export default router;