/* eslint-disable no-console */
import { User } from '@modules/user/entity/User';
import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    console.log('🌱 Seeding users...');

    const userRepository = dataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash('abc123', 10);
    await userRepository.save({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      email_verified: true,
    });

    await factoryManager.get(User).saveMany(10);

    console.log('✅ Users seeded successfully!');
  }
}
