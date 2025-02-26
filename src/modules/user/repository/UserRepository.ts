import { AppDataSource } from '@infra/database/config';
import { User } from '@modules/user/entity/User';
import { Repository } from 'typeorm';

import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  private readonly repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    return await this.repo.save(newUser);
  }

  async findById(id: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.repo.update(id, data);
    return (await this.findById(id)) as User;
  }

  async delete(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }
}
