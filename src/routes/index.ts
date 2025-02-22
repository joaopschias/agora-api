import { Router } from 'express';

import healthCheckRouter from './health.routes';
import rootRouter from './root.routes';

const router = Router();

router.use('/health', healthCheckRouter);
router.use('/', rootRouter);

export default router;
