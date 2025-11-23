import { httpStatus, HttpStatusCodeType } from "../config/http.config"; 

export const errorCodes = {
    ERR_INTERNAL: "ERR_INTERNAL",
    ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
    ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
    ERR_FORBIDDEN: "ERR_FORBIDDEN",
    ERR_NOT_FOUND: "ERR_NOT_FOUND",
} as const

export type ErrorCodeType = keyof typeof errorCodes;

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: HttpStatusCodeType = httpStatus.INTERNAL_SERVER_ERROR,
        public errorCode: ErrorCodeType = errorCodes.ERR_INTERNAL
    ) {
        super(message);
        Error.captureStackTrace(this, this.constructor)
    }
}

export class InternalServerException extends AppError {
    constructor(message: string = "Internal Server Error") {
        super(message, httpStatus.INTERNAL_SERVER_ERROR, errorCodes.ERR_INTERNAL);
    }
}

export class NotFoundException extends AppError {
    constructor(message: string = "Not Found") {
        super(message, httpStatus.NOT_FOUND, errorCodes.ERR_NOT_FOUND);
    }
}

export class BadRequestException extends AppError {
    constructor(message: string = "Bad Request") {
        super(message, httpStatus.BAD_REQUEST, errorCodes.ERR_BAD_REQUEST);
    }
}

export class UnauthorizedException extends AppError {
    constructor(message: string = "Unauthorized Access") {
        super(message, httpStatus.UNAUTHORIZED, errorCodes.ERR_UNAUTHORIZED);
    }
}