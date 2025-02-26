import { AppDataSource } from '@infra/database/config';
import { User } from '@modules/user/entity/User';
import { Repository } from 'typeorm';

import { IUserRepository } from './IUserRepository';

/**
 * Repository for managing user-related database operations.
 */
export class UserRepository implements IUserRepository {
  /**
   * The TypeORM repository instance for the User entity.
   * @var Repository<User>
   */
  private readonly repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  /**
   * Retrieves all users from the database.
   *
   * @returns {Promise<User[]>} - A list of all users.
   */
  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  /**
   * Creates a new user record in the database.
   *
   * @param {Partial<User>} user - The user data to be stored.
   * @returns {Promise<User>} - The created user entity.
   */
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    return await this.repo.save(newUser);
  }

  /**
   * Finds a user by their unique ID.
   *
   * @param {number} id - The ID of the user.
   * @returns {Promise<User | null>} - The found user or null if not found.
   */
  async findById(id: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email of the user.
   * @returns {Promise<User | null>} - The found user or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  /**
   * Updates user information.
   *
   * @param {number} id - The ID of the user to update.
   * @param {Partial<User>} data - The updated user data.
   * @returns {Promise<User>} - The updated user entity.
   */
  async update(id: number, data: Partial<User>): Promise<User> {
    await this.repo.update(id, data);
    return (await this.findById(id)) as User;
  }

  /**
   * Soft deletes a user by setting the deleted_at timestamp.
   *
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }
}
