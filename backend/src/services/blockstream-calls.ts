import { Request, Response } from 'express';

export async function getTx(req: Request, res: Response) {
    const { txid } = req.params;

    try {
        console.log('Fetching transaction data for:', txid);
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
}