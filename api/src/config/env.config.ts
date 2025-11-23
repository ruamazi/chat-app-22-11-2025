import { getEnv } from "../utils/get-env";


export const Env = {
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    PORT: getEnv('PORT', '3000'),
    MONGODB_URI: getEnv('MONGODB_URI', 'mongodb://localhost:27017/chat-app'),
    JWT_SECRET: getEnv('JWT_SECRET', 'secret'),
    JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '7d'),
    FRONTEND_URL: getEnv('FRONTEND_URL', 'http://localhost:3000'),
} as const;