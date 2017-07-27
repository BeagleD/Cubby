import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

router.post('/policies/quote', (req, res, next) => {
  ShareTempus.policies.quote({ req, res, next });
});

export default router;
