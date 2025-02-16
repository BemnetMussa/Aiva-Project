import { Request, Response } from "express";
import Message from "../models/Message";
import Chat from "../models/Chat";

// Send a Message
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, sender, content } = req.body;

    if (!chatId || !sender || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Message({ chatId, sender, content });
    await newMessage.save();

    await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get All Messages in a Chat
export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).populate(
      "sender",
      "name email"
    );
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Mark Messages as Read
export const markMessagesAsRead = async (req: Request, res: Response) => {
  try {
    const { chatId, userId } = req.body;

    await Message.updateMany(
      { chatId, readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );

    return res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
