import { validateRequest } from '@middleware/validationRequest';
import { UserController } from '@modules/user/controller/UserController';
import { deleteUserValidation, getUserValidation } from '@modules/user/validation/UserValidation';
import { Request, Response, Router } from 'express';

const router = Router();
const userController = new UserController();

router.post('/', async (req: Request, res: Response) => {
  await userController.create(req, res);
});

router.get('/:id', getUserValidation, validateRequest, async (req: Request, res: Response) => {
  await userController.getById(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
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
