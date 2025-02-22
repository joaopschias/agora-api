import config from 'config';
import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: `${config.get<string>('appName')} is healthy!`,
    version: config.get<string>('version'),
    timestamp: new Date().toISOString(),
  });
});

export default router;
