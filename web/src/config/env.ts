import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_INSTANT_APP_ID: z.string().uuid(),
});

export const env = envSchema.parse(process.env);

export const NEXT_PUBLIC_INSTANT_APP_ID = env.NEXT_PUBLIC_INSTANT_APP_ID;
