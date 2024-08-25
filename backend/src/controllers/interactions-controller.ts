import { Request, Response } from 'express';
import { Interactions } from '../entities/interactions';
import AppDataSource from '../config/database';

export const getInteractions = async (req: Request, res: Response) => {
    try {
        const interactionsRepository = AppDataSource.getRepository(Interactions);
        const interactions = await interactionsRepository.find();
        res.json(interactions);
    } catch (error) {
        console.error('Error fetching interactions:', error);
        res.status(500).json({ error: 'Failed to fetch interactions' });
    }
};

export const getInteractionById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const sql =
            `SELECT "p"."step", 
                "p"."txid" as "p_txid", 
                "v"."txid" as "v_txid",
                "p"."response_timeout" as "p_response_timeout", 
                "v"."response_timeout" as "v_response_timeout" 
            FROM 
            (SELECT "step", "txid",  "response_timeout"
                FROM interaction_steps 
                WHERE "identity" = 1 
                AND "interaction_id" = $1) as p
            FULL OUTER JOIN
            (SELECT "step", "txid",  "response_timeout"
                FROM interaction_steps 
                WHERE "identity" = 2 
                AND "interaction_id" = $1) as "v"
            ON "p"."step" = "v"."step"`;

        const interactionsRepository = AppDataSource.getRepository(Interactions);
        const interaction = await interactionsRepository.findOne({ where: { interaction_id: id } });

        const interactionsSteps = await AppDataSource.query(sql, [id]);
        // const interactionsSteps = await interactionsStepsRepository.find({ where: { interaction_id: id }, order: { step: 'ASC', identity: 'ASC' } });


        if (interaction && interactionsSteps) {
            res.json({
                ...interaction,
                protocol: interactionsSteps
            });
        } else {
            res.status(404).json({ error: 'Interaction not found' });
        }
    } catch (error) {
        console.error('Error fetching interaction data:', error);
        res.status(500).json({ error: 'Failed to fetch interaction data' });
    }
};