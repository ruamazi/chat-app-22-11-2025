import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { sendMessageValidator } from "../validators/message.validator";
import { httpStatus } from "../config/http.config";
import { sendMessageService } from "../services/message.service";

export const sendMessageController = asyncHandler(
 async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const body = sendMessageValidator.parse(req.body);

  const result = await sendMessageService(userId, body);

  return res.status(httpStatus.OK).json({
   message: "Message sent successfully",
   ...result,
  });
 }
);
