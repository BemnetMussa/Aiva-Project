import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";


export const signup = async (req: Request, res: Response): Promise<void> => {
  console.log("user singing up started")
  const { name,
     email,
     password, 
     gender, 
     dob, 
     agree 
    } = req.body;

    console.log(name, email, password)

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      gender,
      dob,
      agree,
    });
 
    console.log(user)

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
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
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("cookie created successfully with token:", token);

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const google = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({ name, email });
    const userData = user.toObject();
    const { password: pass, ...rest } = userData;

    res.status(201).json({ message: "User created successfully", rest });
  } catch (error) {
    res.status(500).json({ message: "Servererror" });
  }
};

