import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Identity } from 'bitsnark';

export enum TxType {
    stake = 0,
    initial = 1,
    challenge = 2,
    step = 3
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
    tx_identity!: Identity;

    @Column({ type: 'int' })
    pos_in_block!: number;

    @Column()
    has_next_tx: boolean = false;

    @Column({ default: null })
    decodedData!: string;

    @Column({ type: 'jsonb' })
    raw_data!: object;
}
