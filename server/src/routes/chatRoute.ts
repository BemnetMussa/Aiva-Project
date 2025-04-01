import express from "express";
import {
  createOrGetChat,
  getUserChats,
  deleteChat,
} from "../controllers/ChatController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/start-chat", protect, createOrGetChat);
router.get("/user/:userId", protect, getUserChats);
router.delete("/delete/:chatId", protect, deleteChat);

export default router;
