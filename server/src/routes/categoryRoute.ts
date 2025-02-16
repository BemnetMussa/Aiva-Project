// routes/categoryRoutes.ts
import express from "express";
import {
  getCategories,
  createCategory,
 
} from "../controllers/CategoryController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Category routes
router.get("/", protect, getCategories);
router.post("/create", protect, createCategory);



export default router;
