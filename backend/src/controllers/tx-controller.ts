import { Request, Response } from 'express';
import { RawTx } from '../entities/rawTx';
import AppDataSource from '../config/db-config';
import { processTxWitness } from '../services/process-tx-witness';
import { TxData } from '../types/blockstream';


export const getRawTx = async (req: Request, res: Response) => {
    try {
        const { txid } = req.params;
        const txRepository = AppDataSource.getRepository(RawTx);
        const tx = await txRepository.findOne({ where: { txid: txid } });
        for (const vin of (tx?.raw_data as TxData).vin) {
            vin.decoded = processTxWitness(vin.witness).toLocaleString();
        }
        res.json(tx);
    } catch (error) {
        console.error('Error fetching interactions:', error);
        res.status(500).json({ error: 'Failed to fetch interactions' });
    }
};