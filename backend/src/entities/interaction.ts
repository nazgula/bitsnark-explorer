import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum InteractionStatus {
    active = 1,
    timedout = 2,
    proved = 3,
    disproved = 4,
}

@Entity()

export class Interaction {
    @PrimaryColumn({ unique: true })
    interaction_id!: string;

    @Column({ type: 'int' })
    total_steps!: number;

    @Column({ type: 'bigint' })
    init_datetime!: bigint;

    @Column({ type: 'int', default: null })
    v_stake_amount!: number;

    @Column({ type: 'varchar', default: null })
    v_stake_tx!: string;

    @Column({ type: 'int', default: null })
    p_stake_amount!: number;

    @Column({ type: 'varchar' })
    p_stake_tx!: string;

    @Column({ type: 'bigint' })
    next_timeout!: bigint;

    //Add next_turn_idenitity

    @Column({ default: InteractionStatus.active })
    status: InteractionStatus = InteractionStatus.active;
}
