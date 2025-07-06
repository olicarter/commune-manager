import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

export const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
