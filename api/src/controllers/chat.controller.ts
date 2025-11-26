import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
 chatIdSchema,
 createChatValidator,
} from "../validators/chat.validator";
import {
 createChatService,
 getSingleChatService,
 getUserChatsService,
} from "../services/chat.service";
import { httpStatus } from "../config/http.config";

export const createChatController = asyncHandler(
 async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const body = createChatValidator.parse(req.body);

  const chat = await createChatService(userId, body);

  res.status(httpStatus.OK).json({
   message: "Chat created or retrieved successfully",
   chat,
  });
 }
);

export const getUserChatsController = asyncHandler(
 async (req: Request, res: Response) => {
  const chats = await getUserChatsService(req.user?._id);
  res.status(httpStatus.OK).json({
   message: "User chats retrieved successfully",
   chats,
  });
 }
);

export const getSingleChatController = asyncHandler(
 async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = chatIdSchema.parse(req.params);

  const { chat, messages } = await getSingleChatService(userId, id);

  return res.status(httpStatus.OK).json({
   message: "User chats retrieved successfully",
   chat,
   messages,
  });
 }
);
