import { userFavorites } from "../controllers/FavoritesController";
import { protect } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();


router.get("/", protect, userFavorites);

export default router;
