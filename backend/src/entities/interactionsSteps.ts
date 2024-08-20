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

    @Column({ unique: true })
    p_txid!: string;

    @Column({ type: 'int' })
    p_tx_block!: playerIndentity;

    @Column({ type: 'timestamp' })
    p_tx_datetime!: Date;

    @Column({ unique: true })
    v_txid!: string;

    @Column({ type: 'int' })
    v_tx_block!: playerIndentity;

    @Column({ type: 'timestamp' })
    v_tx_datetime!: Date;

    @Column({ type: 'timestamp' })
    response_timeout!: Date;

    @ManyToOne(() => Interactions, interaction => interaction.interactionId)
    @JoinColumn({ name: 'interactionId' })
    interaction!: Interactions;
}
