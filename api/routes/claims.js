import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

router.post('/claims/create', (req, res, next) => {
  ShareTempus.claims.create({ req, res, next });
});

router.get('/claims/:claim', (req, res, next) => {
  ShareTempus.claims.retrieve({ req, res, next });
});

export default router;
