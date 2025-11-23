import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService } from "../services/auth.service";
import { clearJwtCookie, setJwtCookie } from "../utils/cookie";
import { httpStatus } from "../config/http.config";

export const registerController = asyncHandler(async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body)
   const user = await registerService(body)
   const userId = user._id.toString() as string
   return setJwtCookie({res, userId}).status(httpStatus.CREATED)
   .json({message: "User registered successfully", user})
})

export const loginController = asyncHandler(async(req:Request, res: Response)=>{
    const body = loginSchema.parse(req.body)
    const user = await loginService(body)
    const userId = user._id.toString() as string
    return setJwtCookie({res, userId}).status(httpStatus.OK)
    .json({message: "User logged in successfully", user})
})

export const logoutController = asyncHandler(async(req:Request, res: Response)=>{
    return clearJwtCookie(res).status(httpStatus.OK)
    .json({message: "User logged out successfully"})
})

 export const authStatusController = asyncHandler(async(req:Request, res: Response)=>{
  const user = req.user?._id;
  return res.status(httpStatus.OK)
  .json({message: "User authenticated successfully", user})
 })