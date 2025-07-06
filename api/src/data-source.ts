import { DataSource } from 'typeorm';
import { Community } from './community/community.entity';
import { DATABASE_URL } from './config/env';

export default new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: [Community],
  migrations: ['src/migrations/*.ts'],
});
