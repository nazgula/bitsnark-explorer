import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Interactions } from './interactions';
import { Tx } from './tx';


export enum playerIndentity {
    prover = 1,
    Verifier = 2,
}

@Entity()
export class InteractionSteps {
    @PrimaryColumn({ unique: true })
    interaction_id!: string;

    @PrimaryColumn({ type: 'int' })
    step!: number;

    @PrimaryColumn({ type: 'int' })
    identity!: playerIndentity;

    @Column({ unique: true })
    txid!: string;

    @Column({ type: 'bigint' })
    p_tx_datetime!: bigint;

    @Column({ type: 'varchar' })
    tx_block_hash!: string;

    @Column({ type: 'bigint' })
    response_timeout!: bigint;

    @ManyToOne(() => Interactions, interaction => interaction.interaction_id)
    @JoinColumn({ name: 'interaction_id' })
    interaction!: Interactions;
}
