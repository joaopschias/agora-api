import dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error('❌ Missing database environment variables!');
}

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  entities: [path.join(__dirname, '../../modules/**/entity/*.ts')],
  migrations: [path.join(__dirname, './migrations/*.ts')],
  subscribers: [path.join(__dirname, './subscribers/*.ts')],
});
