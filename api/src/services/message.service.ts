import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.config";
import ChatModel from "../models/Chat.model";
import MessageModel from "../models/Message.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";

type BodyType = {
 chatId: string;
 content?: string;
 image?: string;
 replyToId?: string;
};

export const sendMessageService = async (userId: string, body: BodyType) => {
 const { chatId, content, image, replyToId } = body;

 const chat = await ChatModel.findOne({
  _id: chatId,
  participants: { $in: [userId] },
 });
 if (!chat) throw new BadRequestException("Chat not found or unauthorized");

 if (replyToId) {
  const replyMessage = await MessageModel.findOne({
   _id: replyToId,
   chatId,
  });
  if (!replyMessage) throw new NotFoundException("Reply message not found");
 }
 let imageUrl;
 if (image) {
  const uploadResponse = await cloudinary.uploader.upload(image);
  imageUrl = uploadResponse.secure_url;
 }

 const newMessage = await MessageModel.create({
  chatId,
  sender: userId,
  content,
  image: imageUrl,
  replyTo: replyToId || null,
 });
 await newMessage.populate([
  { path: "sender", select: "name avatar" },
  {
   path: "replyTo",
   select: "content image sender",
   populate: { path: "sender", select: "name avatar" },
  },
 ]);
 chat.lastMessage = newMessage._id as mongoose.Types.ObjectId;
 await chat.save();
 //websocket
 return { userMessage: newMessage, chat };
};
