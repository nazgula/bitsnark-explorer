import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

    @Column({ type: 'boolean' })
    confirmed!: boolean;

    @Column({ type: 'int' })
    block_height!: number;

    @Column()
    block_hash!: string;

    @Column({ type: 'timestamp' })
    block_time!: Date;

    @OneToMany(() => Vin, vin => vin.tx, { cascade: true })
    @JoinColumn()
    vin!: Vin[];

    @OneToMany(() => Vout, vout => vout.tx, { cascade: true })
    @JoinColumn()
    vout!: Vout[];
}

@Entity()
export class Vin {
    @PrimaryColumn()
    txid!: string;

    @Column({ type: 'int' })
    vout!: number;

    @Column()
    scriptsig!: string;

    @Column()
    scriptsig_asm!: string;

    @Column({ type: 'jsonb' })
    witness!: string[];

    @Column({ type: 'boolean' })
    is_coinbase!: boolean;

    @Column({ type: 'bigint' })
    sequence!: number;

    @ManyToOne(() => Tx, tx => tx.vin)
    tx!: Tx;

    @Column({ type: 'jsonb' })
    prevout!: {
        scriptpubkey: string;
        scriptpubkey_asm: string;
        scriptpubkey_type: string;
        scriptpubkey_address: string;
        value: number;
    };
}

@Entity()
export class Vout {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    scriptpubkey!: string;

    @Column()
    scriptpubkey_asm!: string;

    @Column()
    scriptpubkey_type!: string;

    @Column()
    scriptpubkey_address!: string;

    @Column({ type: 'int' })
    value!: number;

    @ManyToOne(() => Tx, tx => tx.vout)
    tx!: Tx;
}
