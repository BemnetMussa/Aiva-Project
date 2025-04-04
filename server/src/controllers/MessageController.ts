import { Request, Response } from "express";
import Message from "../models/Message";

// Get All Messages in a Chat
export const getChatMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 })
      .populate("sender", "name email, image");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
