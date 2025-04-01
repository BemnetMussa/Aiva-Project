import { Request, Response } from "express";
import Message from "../models/Message";
import Chat from "../models/Chat";

// Send a Message
export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId, sender, content, fileUrl } = req.body;

    if (!chatId || !sender || (!content && !fileUrl)) {
      res.status(400).json({ message: "Content or file URL is required." });
      return;
    }

    const newMessage = new Message({ chatId, sender, content });
    await newMessage.save();

    await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Messages in a Chat
export const getChatMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).populate(
      "sender",
      "name email"
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Mark Messages as Read
export const markMessagesAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId, userId } = req.body;

    await Message.updateMany(
      { chatId, readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
