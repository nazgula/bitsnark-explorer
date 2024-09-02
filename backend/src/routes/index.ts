
import express from 'express';
import { getInteractionById, getInteractions } from '../controllers/interactions-controller';
import { getRawTx } from '../controllers/tx-controller';

const router = express.Router();

router.get('/getRawTx/:txid', getRawTx);
router.get('/getInteractions', getInteractions);
router.get('/getInteraction/:id', getInteractionById);

export default router;

