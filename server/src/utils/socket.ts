import { Server } from "socket.io";
import http from "http";
import type { Express } from "express";
import Message from "../models/Message";
import Chat from "../models/Chat";
import { Types } from "mongoose";

interface TypingData {
  userName: string;
  senderId: string;
}

const setupSocket = (app: Express) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const typingUsers: {
    [key: string]: TypingData;
  } = {};

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinChat", (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined chat ${chatId}`);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { chatId, sender, content, messageType, fileUrl } = data;

        const newMessage = new Message({
          chatId,
          sender,
          content,
          messageType,
          fileUrl,
          readBy: [],
        });

        const savedMessage = await newMessage.save();

        // Update lastMessage in the chat

        if (savedMessage) {
          await Chat.findByIdAndUpdate(chatId, {
            lastMessage: savedMessage._id,
          });
        }

        console.log("new message", newMessage);

        // Send the message to all users in the chat (including sender)
        const clients = io.sockets.adapter.rooms.get(chatId);
        if (clients && clients.size > 0) {
          socket.broadcast.to(chatId).emit("newMessage", {
            ...savedMessage.toObject(),
            sender,
          });
        } else {
          console.log(`No active clients in room ${chatId}, message saved.`);
        }

        console.log("Message sent and saved successfully.");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    });

    socket.on("markMessageAsRead", async (messageId, userId) => {
      try {
        // Find the message in the database
        const message = await Message.findById(messageId);
        if (!message) {
          console.log("Message not found.");
          return;
        }

        // If the user hasn't already read the message, add them to the readBy list
        if (!message.readBy.includes(new Types.ObjectId(userId))) {
          message.readBy.push(new Types.ObjectId(userId));
          await message.save();
        }

        // Emit read event to the chat room
        io.to(message.chatId.toString()).emit("messageRead", messageId);

        console.log("Message marked as read");
      } catch (error) {
        console.error("Error marking message as read: ", error);
      }
    });

    socket.on("typing", (data) => {
      const { chatId, senderId, userName } = data;
      typingUsers[chatId] = {
        userName,
        senderId,
      };
      socket.broadcast.to(chatId).emit("displayTyping", {
        userName,
        chatId,
        senderId,
      });
    });

    socket.on("stopTyping", ({ chatId }) => {
      delete typingUsers[chatId];
      socket.broadcast.to(chatId).emit("displayTyping", {
        chatId,
        userName: "",
        senderId: "",
      });
    });

    // You can also handle other events like disconnect here
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return { io, server };
};

export default setupSocket;
