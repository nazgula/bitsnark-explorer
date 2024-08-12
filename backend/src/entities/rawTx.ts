import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class RawTx {
    @PrimaryColumn({ unique: true })
    txId!: string;

    @Column({ type: 'jsonb' })
    rawData!: object;

    @Column({ default: false })
    processed: boolean = false;
}
