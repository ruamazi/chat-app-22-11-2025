import { getEnv } from "../utils/get-env";

export const Env = {
 NODE_ENV: getEnv("NODE_ENV", "development"),
 PORT: getEnv("PORT", "3000"),
 FRONTEND_URL: getEnv("FRONTEND_URL", "http://localhost:3000"),
 //MONGODB
 MONGODB_URI: getEnv("MONGODB_URI", "mongodb://localhost:27017/chat-app"),
 //JWT
 JWT_SECRET: getEnv("JWT_SECRET", "secret"),
 JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "7d"),
 // CLOUDINARY
 CLOUDINARY_NAME: getEnv("CLOUDINARY_NAME"),
 CLOUDINARY_API_KEY: getEnv("CLOUDINARY_API_KEY"),
 CLOUDINARY_SEC: getEnv("CLOUDINARY_SEC"),
} as const;
