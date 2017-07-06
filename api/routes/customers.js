import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

router.post('/customers/create', (req, res, next) => {
  ShareTempus.customers.create({ req, res, next });
});

export default router;
