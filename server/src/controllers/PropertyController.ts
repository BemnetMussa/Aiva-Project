import { Request, Response } from "express";
import Property from "../models/Property";

export const fetchProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("fetching property started")
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    description,
    type,
    status,
  } = req.body;

  const userId = (req as any).user?.id; // Get the user ID from the token

  try {
    if (!userId) {
      res.status(400).json({ message: "Try again, an error occurred" });
      return;
    }

    const property = await Property.create({
      userId,
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      squareFeet,
      description,
      type,
      status,
    });

    res.status(200).json({ message: "Property added successfully", property });
  } catch (error) {
    console.error("Error adding property:", error); // Debugging: Log the error
    res.status(500).json({ message: "Server error" });
  }
};


export const userProperty = async (req: Request, res: Response): Promise<void> => {
   
    try {
        const userId = (req as any).user?.id;
        const properties = await Property.find({ userId });

        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching user properties:", error);
        res.status(500).json({ message: "Server error" });
    }
}