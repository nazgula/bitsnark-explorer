import AppDataSource from '../config/database';
import { QueryRunner } from 'typeorm';

export async function createQueryRunner(): Promise<QueryRunner> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
}

export async function commitTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
    await queryRunner.release();
}

export async function rollbackTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
}