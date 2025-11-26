import ChatModel from "../models/Chat.model";
import MessageModel from "../models/Message.model";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";

type bodyType = {
 participantId?: string;
 isGroup?: boolean;
 participants?: string[];
 groupName?: string;
};

export const createChatService = async (userId: string, body: bodyType) => {
 const { participantId, isGroup, participants, groupName } = body;

 let chat;
 let allParticipantsIds: string[] = [];

 if (isGroup && participants?.length && groupName) {
  allParticipantsIds = [...participants, userId];
  chat = await ChatModel.create({
   participants: allParticipantsIds,
   groupName,
   isGroup: true,
   createdBy: userId,
  });
 } else if (participantId) {
  const otherUser = await UserModel.findById(participantId);
  if (!otherUser) throw new NotFoundException("User not found");
  allParticipantsIds = [userId, participantId];
  const existingChat = await ChatModel.findOne({
   participants: { $all: allParticipantsIds, $size: 2 },
  }).populate("participants", "name avatar");

  if (existingChat) {
   return existingChat;
  }
  chat = await ChatModel.create({
   participants: allParticipantsIds,
   isGroup: false,
   createdBy: userId,
  });
 }

 return chat;
};

export const getUserChatsService = async (userId: string) => {
 const chats = await ChatModel.find({
  participants: { $in: [userId] },
 })
  .populate("participants", "name avatar")
  .populate({
   path: "lastMessage",
   populate: { path: "sender", select: "name avatar" },
  })
  .sort({ updatedAt: -1 });
 return chats;
};

export const getSingleChatService = async (userId: string, chatId: string) => {
 const chat = await ChatModel.findOne({
  _id: chatId,
  participants: { $in: [userId] },
 });
 if (!chat) {
  throw new BadRequestException(
   "Chat not found or you are not authorized to view this chat"
  );
 }
 const messages = await MessageModel.find({ chatId })
  .populate("sender", "name avatar")
  .populate({
   path: "replyTo",
   select: "content image sender",
   populate: { path: "sender", select: "name avatar" },
  })
  .sort({ createdAt: 1 });

 return { chat, messages };
};
