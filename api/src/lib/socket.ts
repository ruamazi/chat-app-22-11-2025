import { Server as HTTPServer } from "http";
import { Server, type Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { Env } from "../config/env.config";

interface AuthenticatedSocket extends Socket {
 userId?: string;
}

let io: Server | null = null;

export const initializeSocket = (httpServer: HTTPServer) => {
 io = new Server(httpServer, {
  cors: {
   origin: Env.FRONTEND_URL,
   methods: ["GET", "POST"],
   credentials: true,
  },
 });

 // verify auth
 io.use(async (socket: AuthenticatedSocket, next) => {
  try {
   const rawCookie = socket.request.headers.cookie;
   if (!rawCookie) return next(new Error("Unauthorized"));
   const token = rawCookie.split("=")?.[1]?.trim();
   if (!token) return next(new Error("Unauthorized"));
   const decodedToken = jwt.verify(token, Env.JWT_SECRET) as { userId: string };
   if (!decodedToken) return next(new Error("Unauthorized"));

   socket.userId = decodedToken.userId;
   next();
  } catch (error) {
   console.log(error);
   next(new Error("Internal server error"));
  }
 });
};

io.on("connection", (socket: AuthenticatedSocket) => {
 const userId = socket.userId;
 console.log(`User ${userId} connected`);
});
