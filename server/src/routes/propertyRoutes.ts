import express from "express";
import {
  addProperty,
  fetchProperties,
  userProperty,
} from "../controllers/PropertyController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", protect, addProperty);
router.get("/", fetchProperties);
router.get("/fetchProperty", protect, userProperty);

export default router;
