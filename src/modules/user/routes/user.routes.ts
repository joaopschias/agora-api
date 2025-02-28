import { validationMiddleware } from '@middleware/validation-middleware';
import { UserController } from '@modules/user/controller/UserController';
import {
  createUserValidation,
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
} from '@modules/user/validation/user.validation';
import { Request, Response, Router } from 'express';

const router = Router();
const userController = new UserController();

router.get('/', async (req: Request, res: Response) => {
  await userController.all(req, res);
});

router.post(
  '/',
  createUserValidation,
  validationMiddleware,
  async (req: Request, res: Response) => {
    await userController.create(req, res);
  }
);

router.get('/:id', getUserValidation, validationMiddleware, async (req: Request, res: Response) => {
  await userController.getById(req, res);
});

router.patch(
  '/:id',
  updateUserValidation,
  validationMiddleware,
  async (req: Request, res: Response) => {
    await userController.update(req, res);
  }
);

router.delete(
  '/:id',
  deleteUserValidation,
  validationMiddleware,
  async (req: Request, res: Response) => {
    await userController.delete(req, res);
  }
);

export default router;
