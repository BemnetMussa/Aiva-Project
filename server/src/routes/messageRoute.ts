import express from "express";
import {
  getChatMessages,
  markMessagesAsRead,
  sendMessage,
} from "../controllers/MessageController";

const router = express.Router();

router.post("/", sendMessage);

router.get("/get:chatId", getChatMessages);

router.patch("/mark", markMessagesAsRead);

export default router;
