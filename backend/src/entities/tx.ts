import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne, Timestamp } from 'typeorm';

@Entity()
export class Tx {
    @PrimaryColumn()
    txid!: string;

    @Column({ type: 'int' })
    version!: number;

    @Column({ type: 'int' })
    locktime!: number;

    @Column({ type: 'int' })
    size!: number;

    @Column({ type: 'int' })
    weight!: number;

    @Column({ type: 'int' })
    fee!: number;

    @Column({ type: 'boolean', default: false })
    confirmed!: boolean;

    @Column({ type: 'int', default: null })
    block_height!: number;

    @Column({ default: null })
    block_hash!: string;

    @Column({ type: 'bigint', default: null })
    block_time!: bigint;

    @Column({ type: 'jsonb' })
    vout!: {
        scriptpubkey: string;
        scriptpubkey_asm: string;
        scriptpubkey_type: string;
        scriptpubkey_address: string;
        value: number;
    }[];


    @OneToMany(() => Vin, vin => vin.tx, { cascade: true })
    @JoinColumn()
    vin!: Vin[];
}

@Entity()
export class Vin {
    @PrimaryColumn()
    vin_txid!: string;

    @Column({ type: 'int' })
    vout!: number;

    @Column()
    scriptsig!: string;

    @Column({ default: null })
    scriptsig_asm!: string;

    @Column({ type: 'jsonb', default: [] })
    witness!: string[];

    @Column({ type: 'boolean', default: null })
    is_coinbase!: boolean;

    @Column({ type: 'bigint' })
    sequence!: number;

    @ManyToOne(() => Tx, tx => tx.vin)
    tx!: Tx;

    @Column({ type: 'jsonb', default: null })
    prevout!: {
        scriptpubkey: string;
        scriptpubkey_asm: string;
        scriptpubkey_type: string;
        scriptpubkey_address: string;
        value: number;
    };
}