import exp from 'constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum TxType {
    stake = 0,
    initial = 1,
    challenge = 2,
    step = 3
}

export enum Indentity {
    prover = 1,
    verifier = 2,
}

@Entity()
export class RawTx {
    @PrimaryColumn({ unique: true })
    txid!: string;

    @Column({ type: 'bigint' })
    block_height!: bigint;

    @Column()
    tx_type!: number;

    @Column({ default: null })
    tx_identity!: Indentity;

    @Column({ type: 'int' })
    pos_in_block!: number;

    @Column()
    has_next_tx: boolean = false;

    @Column({ default: null })
    decodedData!: string;

    @Column({ default: false })
    processed: boolean = false;

    @Column({ type: 'jsonb' })
    raw_data!: object;
}
