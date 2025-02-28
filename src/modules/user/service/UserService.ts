import { CreateUserDTO, UpdateUserDTO } from '@modules/user/dto/user.dto';
import { User } from '@modules/user/entity/User';
import { UserRepository } from '@modules/user/repository/UserRepository';
import { PaginatedResult, PaginationOptions } from '@utils/pagination';
import * as bcrypt from 'bcryptjs';

export class UserService {
  /**
   * Repository instance for user operations.
   * @var UserRepository
   */
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Retrieves paginated users.
   *
   * @param {PaginationOptions} options - Pagination options.
   * @returns {Promise<PaginatedResult<User>>} - Paginated list of users.
   */
  async all(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.userRepository.findAll(options);
  }

  /**
   * Creates a new user after validating and hashing the password.
   *
   * @param {CreateUserDTO} data - The user creation data.
   * @returns {Promise<User>} - The created user.
   * @throws {Error} - If email is already in use.
   */
  async create(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.userRepository.create({ ...data, password: hashedPassword });
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} id - The user ID.
   * @returns {Promise<User | null>} - The found user or null if not found.
   */
  async getById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  /**
   * Retrieves a user by their email.
   *
   * @param {string} email - The user's email.
   * @returns {Promise<User | null>} - The found user or null if not found.
   */
  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  /**
   * Updates a user's data.
   *
   * @param {number} id - The user ID.
   * @param {UpdateUserDTO} data - The user update data.
   * @returns {Promise<User>} - The updated user.
   */
  async update(id: number, data: UpdateUserDTO): Promise<User> {
    return this.userRepository.update(id, data);
  }

  /**
   * Soft deletes a user by their ID.
   *
   * @param {number} id - The user ID.
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
