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

    @Column({ type: 'timestamp' })
    init_datetime!: Date;

    @Column({ type: 'int' })
    v_stake_amount!: number;

    @Column({ type: 'int' })
    p_stake_amount!: number;

    @Column({ type: 'int' })
    total_steps!: number;

    @Column({ default: InteractionStatus.active })
    status: InteractionStatus = InteractionStatus.active;
}
