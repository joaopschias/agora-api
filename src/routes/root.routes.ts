import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to Agora API 🚀',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

export default router;
