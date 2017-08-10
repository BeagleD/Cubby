import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

router.post('/customers/create', (req, res, next) => {
  ShareTempus.customers.create({ req, res, next });
});

router.post('/customers/update', (req, res, next) => {
  ShareTempus.customers.update({ req, res, next });
});

router.get('/customers/:customer', (req, res, next) => {
  ShareTempus.customers.retrieve({ req, res, next });
});

router.post('/customers/find', (req, res, next) => {
  ShareTempus.customers.find({ req, res, next });
});

export default router;
