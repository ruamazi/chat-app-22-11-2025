import mongoose from "mongoose";
import { Env } from "./env.config";

export const connectDB = async () => {
    try {
        await mongoose.connect(Env.MONGODB_URI!);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}
