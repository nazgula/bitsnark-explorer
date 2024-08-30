import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Block {
    @PrimaryColumn()
    id!: string;

    @Column({ type: 'bigint' })
    height!: bigint;

    @Column({ type: 'int' })
    tx_count!: number;

    @Column({ type: 'bigint' })
    timestamp!: bigint;

    @Column({ type: 'int' })
    tx_processed: number = 0;
}
