
import express from 'express';
import { throttle } from '../middlewares/throttle';
import { getTx } from '../services/blockstream-calls';
import { getInteractionById, getInteractions } from '../controllers/interactions-controller';
import { getRawTx } from '../controllers/tx-controller';

const router = express.Router();

router.get('/getTx/:txid', throttle, getTx);
router.get('/getRawTx/:txid', getRawTx);
router.get('/getInteractions', getInteractions);
router.get('/getInteraction/:id', getInteractionById);

export default router;

