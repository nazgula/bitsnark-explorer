import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum InteractionStatus {
    active = 1,
    timedout = 2,
    proved = 3,
    disproved = 4,
}

@Entity()

export class Interactions {
    @PrimaryColumn({ unique: true })
    interactionId!: string;

    @Column({ type: 'int' })
    total_steps!: number;

    @Column({ type: 'bigint' })
    init_datetime!: bigint;

    @Column({ type: 'int' })
    v_stake_amount!: number;

    @Column({ type: 'string' })
    v_stake_tx!: string;

    @Column({ type: 'int' })
    p_stake_amount!: number;

    @Column({ type: 'string' })
    p_stake_tx!: string;

    @Column({ type: 'bigint' })
    next_timeout!: bigint;

    @Column({ default: InteractionStatus.active })
    status: InteractionStatus = InteractionStatus.active;
}
