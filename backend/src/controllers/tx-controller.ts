import { Request, Response } from 'express';
import { Tx, Vin } from '../entities/tx';
import { RawTx } from '../entities/rawTx';
import AppDataSource from '../config/database';

export const getInteractions = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const txRepository = AppDataSource.getRepository(RawTx);
        const tx = await txRepository.find({ where: { tx_id: id } });
        res.json(tx);
    } catch (error) {
        console.error('Error fetching interactions:', error);
        res.status(500).json({ error: 'Failed to fetch interactions' });
    }
};