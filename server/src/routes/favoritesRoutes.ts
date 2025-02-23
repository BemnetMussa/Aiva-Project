import {
  addToFavorites,
  userFavorites,
} from "../controllers/FavoritesController";
import { protect } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.get("/", protect, userFavorites);
router.post("/add", protect, addToFavorites);

export default router;
