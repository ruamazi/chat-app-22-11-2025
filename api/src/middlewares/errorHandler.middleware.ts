import { ErrorRequestHandler } from "express";
import { httpStatus } from "../config/http.config";
import { AppError, errorCodes } from "../utils/app-error";



export const errorHandler: ErrorRequestHandler = (err, req, res, next):any => {
    console.error(`Error accurred: ${req.path}`, err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errorCode: err.errorCode
        })
    }

   return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err?.message || "Something went wrong",
    errorCode: errorCodes.ERR_INTERNAL
   })
};