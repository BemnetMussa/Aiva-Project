import express from "express";

import { protect } from "../middleware/authMiddleware";
import {
  deleteAccount,
  getUserDetail,
  updateUserProfile,
} from "../controllers/UserController";

const router = express.Router();

router.post("/update-user", protect, updateUserProfile);
router.get("/get-user-detail", protect, getUserDetail);
router.delete("/get-user-detail", protect, deleteAccount);

export default router;
