import express from 'express';
import pkg from '../../package.json';

const router = express.Router();

router.get('/status', (req, res) => {
  res.send({ status: 'online' });
});

router.get('/version', (req, res) => {
  res.send({ version: pkg.version });
});

export default router;
