import { validateRequest } from '@middleware/validationRequest';
import { UserController } from '@modules/user/controller/UserController';
import {
  createUserValidation,
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
} from '@modules/user/validation/UserValidation';
import { Request, Response, Router } from 'express';

const router = Router();
const userController = new UserController();

router.post('/', createUserValidation, validateRequest, async (req: Request, res: Response) => {
  await userController.create(req, res);
});

router.get('/:id', getUserValidation, validateRequest, async (req: Request, res: Response) => {
  await userController.getById(req, res);
});

router.patch('/:id', updateUserValidation, validateRequest, async (req: Request, res: Response) => {
  await userController.update(req, res);
});

router.delete(
  '/:id',
  deleteUserValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    await userController.delete(req, res);
  }
);

export default router;
