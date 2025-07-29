import dotenv from 'dotenv';
import z from 'zod';

// Load .env variables into process.env
dotenv.config();

// Define a schema for expected env variables using zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('8080'),

  DATABASE_URL: z.string().url({ message: 'Invalid DATABASE_URL' }),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),

  BCRYPT_SALT_ROUNDS: z.string().default('10'),
});

// Validate and parse environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  process.exit(1); // Stop the app if env vars are invalid
}

const env = parsedEnv.data;

// Export the validated and typed config object
const config = {
  env: env.NODE_ENV,
  port: Number(env.PORT),

  database_url: env.DATABASE_URL,

  jwt_secret: env.JWT_SECRET,
  jwt_expires_in: env.JWT_EXPIRES_IN,

  bcrypt_salt_rounds: env.BCRYPT_SALT_ROUNDS,
};

export default config;
