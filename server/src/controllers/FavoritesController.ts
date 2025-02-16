import { Request, Response } from "express";
import Favorites from "../models/Favorites";
import mongoose from "mongoose";

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
};

// userId, propertyId
// like from the user i will need the userId and also the Poerpty that have he clikced

// then i will response with the valid it will be udpated for that property

export const addFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const propertyId = req.body._id;

    if (!userId || !propertyId) {
      res.status(400).json({ message: "Try again, an error occurred" });
      return;
    }

    const favorites = await Favorites.create({
      userId,
      propertyId,
    });

    res.status(200).json({ message: "Property added successfully", favorites });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Server error" });
  }
};
