import express from "express";
import {
  addProperty,
  fetchProperties,
  userProperty,
  removeProperty,
  switchPropertyState
} from "../controllers/PropertyController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", protect, addProperty);
router.get("/", fetchProperties);
router.get("/fetchProperty", protect, userProperty);
router.delete("/delete", protect, removeProperty)
router.put("/update", protect, switchPropertyState)

export default router;
