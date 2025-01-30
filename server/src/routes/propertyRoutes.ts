import express from "express";
import {
  addProperty,
  fetchProperties,
} from "../controllers/PropertyController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

console.log("hi from propertyRoutes");
router.post("/add", protect, addProperty);
router.get("/", fetchProperties);

export default router;
