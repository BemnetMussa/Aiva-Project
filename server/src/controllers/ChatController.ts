import { Request, Response } from "express";
import Chat from "../models/Chat";
import Message from "../models/Message";

// Create or retrieve a chat between two users

export const createOrGetChat = async (req: Request, res: Response) => {
  try {
    const { user1, user2 } = req.body;

    if (!user1 || !user2) {
      return res.status(400).json({ message: "Both users are required" });
    }

    let chat = await Chat.findOne({
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 },
      ],
    }).populate("lastMessage");

    if (!chat) {
      chat = await Chat.create({ user1, user2 });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
  }
};

// get all chat for a user
export const getUserChats = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;

    const chats = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1", "name email")
      .populate("user2", "name email")
      .populate("lastMessage");

    return res.status(200).json(chats);
  } catch (error) {
    console.log(error);
  }
};

// deleted message
export const deleteChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await Message.deleteMany({ chatId });

    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
