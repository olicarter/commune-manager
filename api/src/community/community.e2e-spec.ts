import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { CommunityModule } from './community.module';

describe('CommunityController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Community],
          synchronize: true,
        }),
        CommunityModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/communities (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/communities')
      .send({ name: 'Test Community' })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.any(Number), name: 'Test Community' }),
    );
  });
});
