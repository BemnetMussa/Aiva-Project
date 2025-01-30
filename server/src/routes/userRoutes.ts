import express from "express";
import { signup, login } from "../controllers/UserController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
console.log("hello from userRoutes");
router.post("/signup", signup);
router.post("/login", login);


export default router;
