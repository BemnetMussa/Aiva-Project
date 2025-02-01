import { Request, Response } from "express";
import Favorites from "../models/Favorites";

export const userFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const properties = await Favorites.find({ userId });

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching user favorites properties:", error);
    res.status(500).json({ message: "Server error" });
  }
}