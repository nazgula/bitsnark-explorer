import express from 'express';

const router = express.Router();
let lastRequestTime = 0;

function throttle() {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < 30000) {
        return true;
    }
    lastRequestTime = currentTime;
    return false;
}
router.get('/getTx/:txid', async (req, res) => {
    const { txid } = req.params;


    if (!throttle()) {
        res.status(429).json({ error: 'Too many requests' });
        return;
    }

    console.log(lastRequestTime, `https://blockstream.info/testnet/api/tx/${txid}`);

    try {
        const response = await fetch(`https://blockstream.info/testnet/api/tx/${txid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});

router.get('/getIneractions', async (req, res) => {
    try {
        res.json([
            { initTx: '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6', step: '0', total: '6', tern: 'Verifier', timeout: '12.9.23 08:40:15' },
            { initTx: 'c860d816bb6f7a1fa90b3d8e6cf6530ab97f3d2c1eec0061407e57b7b633ec70', step: '1', total: '8', tern: 'Prover', timeout: '12.8.23 05:55:15' },
            { initTx: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '6', total: '12', tern: 'Verifier', timeout: '11.8.23 12:02:50' }
        ]);


    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});

router.get('/getTx', async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});
router.get('/getIneraction/:id', async (req, res) => {
    try {
        if (req.params.id === '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6') {
            res.json({
                id: '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6',
                totalSteps: '6',
                protocol: [{ id: '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6', step: '0', pTxId: '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6', timeout: '12.9.23 08:40:15' }]
            });
        }
        else if (req.params.id === 'c860d816bb6f7a1fa90b3d8e6cf6530ab97f3d2c1eec0061407e57b7b633ec70') {
            res.json({
                id: 'c860d816bb6f7a1fa90b3d8e6cf6530ab97f3d2c1eec0061407e57b7b633ec70',
                totalSteps: '8',
                protocol: [
                    { id: 'c860d816bb6f7a1fa90b3d8e6cf6530ab97f3d2c1eec0061407e57b7b633ec70', step: '0', pTxId: 'c860d816bb6f7a1fa90b3d8e6cf6530ab97f3d2c1eec0061407e57b7b633ec70', vTxId: 'c860d816bb6f7a1fa90b3d8e6cf6530ab97f3d2c1eec0061407e57b7b633ec70', timeout: '11.08.23 07:23:15' }]
            });
        }
        else if (req.params.id === '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309') {
            res.json({
                id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309',
                totalSteps: '12',
                protocol: [
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '0', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '1', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '2', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '3', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '4', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '5', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '6', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '7', timeout: '11.08.23 07:23:15' },
                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', vTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '8', timeout: '11.08.23 07:23:15' },

                    { id: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', pTxId: '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', step: '9', timeout: '11.08.23 07:23:15' }]
            });
        }

    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});





export default router;