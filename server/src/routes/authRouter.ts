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

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("forgot-password", forgotPassword);
// router.post('reset-password', resetPassword)

export default router;
