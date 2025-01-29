import express from "express";
import { signup, login, addProperty } from "../controllers/UserController";

const router = express.Router();
console.log("hello from userRoutes");
router.post("/signup", signup);
router.post("/login", login);
router.post("/property/add", addProperty);

export default router;
