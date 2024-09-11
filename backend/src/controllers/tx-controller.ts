import { Request, Response } from 'express';
import { RawTx } from '../entities/rawTx';
import AppDataSource from '../config/db-config';
import { processTxWitness } from '../services/process-tx-witness';
import { TxData } from '../types/blockstream';
import { InteractionStep } from '../entities/interactionStep';//temp

export const getRawTx = async (req: Request, res: Response) => {
    try {
        const { txid } = req.params;
        const txRepository = AppDataSource.getRepository(RawTx);
        const tx = await txRepository.findOne({ where: { txid: txid } });

        //temp get step from interaction step
        const stepRow = await AppDataSource.getRepository(InteractionStep).findOne({ where: { txid: txid } });

        for (const vin of (tx?.raw_data as TxData).vin) {
            if (tx?.tx_identity && stepRow)
                vin.decoded = processTxWitness(vin.witness, tx.tx_identity, stepRow.step).toLocaleString();

        }
        //temp
        res.json(tx);
    } catch (error) {
        console.error('Error fetching interactions:', error);
        res.status(500).json({ error: 'Failed to fetch interactions' });
    }
};