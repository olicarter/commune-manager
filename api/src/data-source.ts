import { DataSource } from 'typeorm';
import { Community } from './community/community.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'commune',
  entities: [Community],
  migrations: ['src/migrations/*.ts'],
});
