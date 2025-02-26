import express from "express";

import { isAdmin, protect } from "../middleware/authMiddleware";
import {
  deleteAccount,
  getAllUser,
  getUserDetail,
  updateUserProfile,
} from "../controllers/UserController";

const router = express.Router();


router.post("/update-user", protect, updateUserProfile);
router.get("/get-user-detail", protect, getUserDetail);
router.get("/get-all-user", protect, isAdmin, getAllUser);
router.delete("/get-user-detail", protect, deleteAccount);

export default router;
