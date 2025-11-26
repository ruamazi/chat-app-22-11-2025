import jwt from "jsonwebtoken"
import { Env } from "../config/env.config"
import { Response } from "express"

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "M" | "y"}`
type Cookie = {
    res: Response,
    userId: string
}


export const setJwtCookie = ({res, userId}: Cookie) => {
 const payload = {userId};
 const expiresIn = Env.JWT_EXPIRES_IN as Time;
 const token = jwt.sign(payload, Env.JWT_SECRET, { audience: ["user"], expiresIn: expiresIn || "7d" });

 return res.cookie("accesstoken", token, {
    httpOnly: true,
    secure: Env.NODE_ENV === "production" ? true : false,
    sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
 })
}

export const clearJwtCookie = (res: Response) => {
    return res.clearCookie("accesstoken", {path: "/"})
}