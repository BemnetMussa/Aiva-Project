import { Request, Response } from "express";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
} from "../utils/generateToken";

// sign up function
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("user singing up started");
    const { name, email, password, gender, dob, agree } = req.body;

    console.log(name, email, password, gender, dob, agree);

    if (!name || !email || !password || !dob || agree === undefined) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

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

    console.log(user);

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    const { password: _, ...rest } = userData;

    console.log(rest);
    res.status(201).json({
      message: "User created successfully",
      rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// sign in function
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

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    console.log(
      "cookie created successfully with token:",
      accessToken,
      refreshToken
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    const { password: _, ...rest } = userData;

    console.log(rest);

    res.status(200).json({
      message: "Login successful",
      user: rest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// logout funtion
export const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

// refresh-token function
export const refreshToken = async () => {};

// forgot password
export const forgotPassword = async () => {};

// reset  password
export const resetPassword = async () => {};

// google auth function
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
    const { password, ...rest } = userData;

    console.log(rest);

    res.status(201).json({ message: "User created successfully", rest });
  } catch (error) {
    res.status(500).json({ message: "Servererror" });
  }
};
