import express from "express";
import { getChatMessages } from "../controllers/MessageController";

const router = express.Router();

router.get("/:chatId", getChatMessages);

export default router;
