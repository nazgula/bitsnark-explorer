import axios from 'axios';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { BlockData, TxData } from '../types/blockstream';
config();


export async function getTx(req: Request, res: Response) {
    const { txid } = req.params;

    try {
        console.log('Fetching transaction data for:', txid);
        const response = await fetch(`https://blockstream.info/testnet/api/tx/${txid}`);
        if (!response.ok) {
            throw new Error(`HTTP error /api/tx/${txid}! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
}

export async function getBlockTip() {
    try {
        const response = await axios.get(`https://blockstream.info/testnet/api/blocks/tip`);
    } catch (error) {
        console.error('Error fetching block tip:', error);
        throw error;
    }
}

export async function getBlockByHeight(height: number) {
    try {
        const apiUrl = `${process.env.BLOCKSTREAM_API_URL}/blocks/${height}`;
        console.log(`getBlockByHeight:  ${apiUrl}`);
        const response = await axios.get(apiUrl);
        if (response.status !== 200) {
            throw new Error(`HTTP error ${apiUrl} | status: ${response.status} | statusText: ${response.statusText}`);
        }
        console.log('getBlockByHeight response.data', response.data);
        if (response.data.length === 0) {
            throw new Error(`Block ${height} not avilable yet`);
        }
        return response.data[0] as BlockData;
    } catch (error) {
        console.error(`Error fetching block by height ${height}:`, error);
        throw error;
    }
}


export async function getBlockTxsFromPos(blockId: string, pos: number) {
    try {
        const apiUrl = `${process.env.BLOCKSTREAM_API_URL}/block/${blockId}/txs/${pos}`;
        console.log(`getBlockTxsFromPos:  ${apiUrl}`);
        const response = await axios.get(apiUrl);
        if (response.status !== 200) {
            throw new Error(`HTTP error ${apiUrl} | status: ${response.status} | statusText: ${response.statusText}`);
        }
        console.log('getBlockTxsFromPos response.data length', response.data.length);
        console.log('getBlockTxsFromPos response.data first tx', response.data[0]);
        if (response.data.length === 0) {
            throw new Error(`Block ${blockId} at position ${pos} returned no transactions`);
        }
        return response.data as TxData[];
    } catch (error) {
        console.error(`Error fetching block ${blockId}/txs/${pos} :`, error);
        throw error;
    }
}