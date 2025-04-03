import { Request, Response } from "express";
import Chat from "../models/Chat";
import Message from "../models/Message";
import mongoose from "mongoose";

// Create or retrieve a chat between two users

export const createOrGetChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { targetUserId } = req.body;
    const currentUserId = req.user?._id;

    if (!targetUserId || !currentUserId) {
      res.status(400).json({ message: "Missing required user IDs." });
      return;
    }

    let chat = await Chat.findOne({
      $or: [
        { user1: currentUserId, user2: targetUserId },
        { user1: targetUserId, user2: currentUserId },
      ],
    }).populate([
      { path: "user1", select: "-password -refreshToken" }, // Exclude sensitive fields
      { path: "user2", select: "-password -refreshToken" }, // Exclude sensitive fields
      { path: "lastMessage", select: "message" }, // Optionally, include specific fields from `lastMessage`
    ]);

    // if chat doesn't exist && create new one
    if (!chat) {
      chat = await Chat.create({
        user1: currentUserId,
        user2: targetUserId,
      });

      // Populate users and other fields after creation
      await chat.populate([
        { path: "user1", select: "-password -refreshToken" },
        { path: "user2", select: "-password -refreshToken" },
      ]);
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

// get all chat for a user
export const getUserChats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: string = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid chat ID format" });
      return;
    }

    const chats = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1", "name email image")
      .populate("user2", "name email image")
      .populate({
        path: "lastMessage",
        select: "_id content messageType createdAt sender", // Fetch last message content
      })
      .sort({ updatedAt: -1 }); // Sort by latest chats

    if (!chats) {
      res.status(404).json({ message: "No chats found for this user" });
      return;
    }

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

// deleted message
export const deleteChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      res.status(400).json({ message: "Invalid chat ID format" });
      return;
    }

    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      res.status(404).json({ message: "Chat not found" });
      return;
    }

    await Message.deleteMany({ chatId });

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};
