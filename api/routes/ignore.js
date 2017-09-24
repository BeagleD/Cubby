import express from 'express';

const router = express.Router();

router.get('/favicon.ico', (req, res) => {
  res.status(204);
});

router.get('/robots.txt', (req, res) => {
  res.status(204);
});

export default router;
