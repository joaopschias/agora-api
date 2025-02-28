import { User } from '@modules/user/entity/User';
import { PaginatedResult, PaginationOptions } from '@utils/pagination';

export interface IUserRepository {
  findAll(options: PaginationOptions): Promise<PaginatedResult<User>>;
  create(user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}
