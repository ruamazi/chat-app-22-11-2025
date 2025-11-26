import "dotenv/config"
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { httpStatus } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { connectDB } from "./config/db.config";
import routes from "./routes";

import "./config/passport.config";

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: Env.FRONTEND_URL,
    credentials: true,
}));
app.use(passport.initialize());

//Routes
app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
      message: "Server is healthy",
      status: "OK",
    });
  })
);

app.use("/api", routes)

app.use(errorHandler)

app.listen(Env.PORT, async ()=>{
    await connectDB();
    console.log(`Server is running on port ${Env.PORT} - ${Env.NODE_ENV} mode`)
})