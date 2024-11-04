import { z, ZodError } from 'zod';
import logger from '../logger/logger';

if (typeof window !== 'undefined') {
  const importMetaEnv = import.meta.env;

  console.warn(
    `beware your env might leak : ${JSON.stringify(process.env)} ${JSON.stringify(importMetaEnv)}`
  );
  throw new Error(
    `env.config.ts This file should not be imported on the client side`
  );
}

logger.log(`loading env :`, process.env);
export const env = await z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PROD: z.boolean(),
    PORT: z.string().optional().default('3000'),
    AUTH_SECRET: z.string(),
    AUTH_TWITCH_ID: z.string(),
    AUTH_TWITCH_SECRET: z.string(),
    AUTH_TWITCH_REDIRECT_URI: z.string(),
  })
  .parseAsync({ ...process.env, PROD: process.env.NODE_ENV === 'production' })
  .catch((error: unknown) => {
    if (error instanceof ZodError) {
      const message = error.errors
        .map((e) => `[ENV] ${e.path.join('.')} ${e.message}`)
        .join('\n');
      console.error(message);
    }
    process.exit(1);
  });
