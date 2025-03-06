import { Request, Response } from "express";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/generateToken";

import crypto from "crypto";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

// sign up function
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, gender, dob, agree } = req.body;

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

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    console.log(accessToken, refreshToken);

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
    const { password: pass, refreshToken: refresh, ...rest } = userData;

    res.status(201).json({
      message: "User created successfully",
      rest,
    });
  } catch (error: any) {
    console.error(error);
    let errorMessage = "An unexpected error occurred. Please try again later.";
    if (error.errors) {
      if (error.errors.dob) {
        errorMessage = error.errors.dob.message;
      } else if (error.errors.password) {
        errorMessage = error.errors.password.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};

// sign in function
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

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

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

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
    const { password: pass, refreshToken: refresh, ...rest } = userData;

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
export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(403).json({ message: "Refresh Token is missing or invalid" });
    return;
  }

  const ValidToken = verifyToken(refreshToken);

  if (ValidToken) {
    const newAccessToken = generateAccessToken(refreshToken);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 15 * 60 * 1000,
    });

    return;
  }
};

// forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "email is not registered",
      });
      return;
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    await user.save();

    // Send the email
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click on the following link to reset your password and the link will expire after 10min: ${resetLink}`,
    });
    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};

// reset  password
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: new Date() }, // ensure token is not expire and make sure the time is in the future
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../serviceAccountKey.json")),
  });
}

// google auth function
export const google = async (req: Request, res: Response): Promise<void> => {
  try {
    const firebaseToken = req.headers.authorization?.split(" ")[1];

    if (!firebaseToken) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    console.log("Received Firebase Token:", firebaseToken);

    console.log("Token Length:", firebaseToken.length);

    // 🔹 Verify Firebase Token (Checks with Google)
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    console.log(decodedToken);

    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      user = await User.create({
        name: decodedToken.name,
        email: decodedToken.email,
      });
    }

    const userData = user.toObject();
    const { password, ...rest } = userData;

    console.log(rest); // 🔹 Return a JWT Token for further communication with your server
    const accessToken = generateAccessToken(user); // Function to generate JWT for the user

    const refreshToken = generateRefreshToken(user);

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

    res.status(201).json({ message: "User created successfully", user: rest });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      if (error.message.includes("id-token-expired")) {
        res.status(401).json({
          message: "Firebase token has expired. Please reauthenticate.",
        });
        return;
      }
      console.error("Google Auth Error:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }

    res.status(500).json({ message: "Server error" });
    return;
  }
};
