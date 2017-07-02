import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

router.get('/categories', (req, res, next) => {
  ShareTempus.categories.retrieve({ req, res, next });
});

export default router;
