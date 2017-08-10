import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

router.post('/policies/quote', (req, res, next) => {
  ShareTempus.policies.quote({ req, res, next });
});

router.post('/policies/create', (req, res, next) => {
  ShareTempus.policies.create({ req, res, next });
});

router.post('/policies/update', (req, res, next) => {
  ShareTempus.policies.update({ req, res, next });
});

router.get('/policies/:policy', (req, res, next) => {
  ShareTempus.policies.retrieve({ req, res, next });
});

export default router;
