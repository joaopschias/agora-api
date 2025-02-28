import { CreateUserDTO, UpdateUserDTO } from '@modules/user/dto/user.dto';
import { UserService } from '@modules/user/service/UserService';
import { Request, Response } from 'express';

/**
 * Controller for handling user-related HTTP requests.
 */
export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Retrieves all users.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async all(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.all();
      return res.status(200).json(users);
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Handles the creation of a new user.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body as CreateUserDTO;
      const newUser = await this.userService.create(userData);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'An unknown error occurred' });
    }
  }

  /**
   * Retrieves a user by ID.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.userService.getById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Updates a user's information.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.userService.getById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const updateData = req.body as UpdateUserDTO;
      const updatedUser = await this.userService.update(userId, updateData);
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'An unknown error occurred' });
    }
  }

  /**
   * Deletes a user (soft delete).
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);

      const user = await this.userService.getById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await this.userService.delete(userId);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
