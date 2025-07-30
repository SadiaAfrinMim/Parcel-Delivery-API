"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = __importDefault(require("zod"));
// Load .env variables into process.env
dotenv_1.default.config();
// Define a schema for expected env variables using zod
const envSchema = zod_1.default.object({
    NODE_ENV: zod_1.default.enum(['development', 'production']).default('development'),
    PORT: zod_1.default.string().default('8080'),
    DATABASE_URL: zod_1.default.string().url({ message: 'Invalid DATABASE_URL' }),
    JWT_SECRET: zod_1.default.string(),
    JWT_EXPIRES_IN: zod_1.default.string().default('7d'),
    BCRYPT_SALT_ROUNDS: zod_1.default.string().default('10'),
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
exports.default = config;
