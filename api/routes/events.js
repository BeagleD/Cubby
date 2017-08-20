import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

router.get('/events/:event', (req, res, next) => {
  ShareTempus.events.retrieve({ req, res, next });
});

export default router;
