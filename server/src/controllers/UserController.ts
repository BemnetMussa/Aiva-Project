import { Request, Response } from "express";
import User from "../models/User";
import Property from "../models/property";
import { generateToken } from "../utils/generateToken";
import { protect } from "../middleware/authMiddleware";
import { userInfo } from "os";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Servererror" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user: any = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (error) {
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

  protect(req, res, async () => {
    const userId = (req as any).user?.id;

    console.log((req as any).user);
    console.log(userId);
    try {
      console.log(!userId);
      if (!userId) {
        return res
          .status(400)
          .json({ message: "Try again, an error occurred" });
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

      res.status(200).json({ message: "Property added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
};
