import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);

export const DATABASE_URL = env.DATABASE_URL;

