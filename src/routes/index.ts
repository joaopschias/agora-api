import userRoutes from '@modules/user/routes/UserRoutes';
import { Router } from 'express';

import healthCheckRouter from './health.routes';
import rootRouter from './root.routes';

const router = Router();

router.use('/health', healthCheckRouter);
router.use('/users', userRoutes);
router.use('/', rootRouter);

export default router;
