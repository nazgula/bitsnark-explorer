import { Request, Response } from 'express';
import { Tx, Vin } from '../entities/tx';
import { RawTx } from '../entities/rawTx';
import AppDataSource from '../config/database';


export const getRawTx = async (req: Request, res: Response) => {
    try {
        console.log('Fetching Raw tx:', req.params);
        const { txid } = req.params;
        const txRepository = AppDataSource.getRepository(RawTx);
        const tx = await txRepository.findOne({ where: { tx_id: txid } });
        console.log('Raw tx:', tx);
        res.json(tx);
    } catch (error) {
        console.error('Error fetching interactions:', error);
        res.status(500).json({ error: 'Failed to fetch interactions' });
    }
};