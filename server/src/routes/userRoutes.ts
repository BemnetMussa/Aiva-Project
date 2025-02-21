import express from "express";

import { protect } from "../middleware/authMiddleware";
import {
  getUserDetail,
  updateUserProfile,
} from "../controllers/UserController";

const router = express.Router();

router.post("/update-user", protect, updateUserProfile);
router.get("/get-user-detail", protect, getUserDetail);

export default router;
