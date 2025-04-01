import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Socket.io Logic
io.on("connection", (socket: any) => {
  console.log("New client connected");

  socket.on("joinChat", (chatId: number) => {
    socket.join(chatId);
    console.log(`User joined chat ${chatId}`);
  });

  socket.on("sendMessage", (message: any) => {
    // Emit message to the corresponding chat room
    io.to(message.chatId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export { app, io, server };
