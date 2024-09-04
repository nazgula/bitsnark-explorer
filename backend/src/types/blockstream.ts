// types/blockstream.ts
export interface BlockData {
    id: string;
    height: number;
    version: number;
    timestamp: number;
    tx_count: number;
    size: number;
    weight: number;
    merkle_root: string;
    previousblockhash: string;
    mediantime: number;
    nonce: number;
    bits: number;
    difficulty: number;
}

export interface TxData {
    txid: string;
    version: number;
    locktime: number;
    size: number;
    weight: number;
    fee: number;
    vin: Vin[];
    vout: Vout[];
    status: {
        confirmed: boolean;
        block_height: number;
        block_hash: string;
        block_time: number;
    }
}

export interface Vin {
    txid: string;
    vout: number;
    scriptsig: string;
    sequence: number;
    witness: string[];
    prevout: Vout;
    decoded?: string; // Decoded witness - not from api but from the service
}


export interface Vout {
    scriptpubkey: string;
    value: number;
    scriptpubkey_asm: string;
    scriptpubkey_type: string;
    scriptpubkey_address: string;
}