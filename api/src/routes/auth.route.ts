import { Router } from "express";
import { authStatusController, loginController, logoutController, registerController } from "../controllers/rigester.controller";
import { passportAuthenticateJwt } from "../config/passport.config";


const authRoutes = Router()
.post("/register", registerController)
.post("/login", loginController)
.post("/logout", logoutController)
.get("/status", passportAuthenticateJwt, authStatusController)

export default authRoutes