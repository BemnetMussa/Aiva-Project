import express from "express";
import {
  signup,
  login,
  google,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.post("/logout", protect, logout);
router.post("/refresh-token", refreshToken);
router.post("forgot-password", forgotPassword);
router.post("reset-password", resetPassword);

export default router;
