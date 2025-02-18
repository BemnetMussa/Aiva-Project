import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import favoritesRoutes from "./routes/favoritesRoutes";
import categoryRoute from "./routes/categoryRoute";
import cookieParser from "cookie-parser";
import multer from "multer";
import chatRoute from "./routes/chatRoute";
import messageRoute from "./routes/messageRoute";

// Create Express app
const app = express();

// server for socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});

dotenv.config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", upload.single("image"), propertyRoutes);
app.use("/api/favorites", upload.single("image"), favoritesRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
});
