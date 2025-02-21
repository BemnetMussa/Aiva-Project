import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

// update profile

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id || !mongoose.isValidObjectId(id)) {
      res.status(401).json({
        message: "Invalid or missing user ID",
      });
      return;
    }

    if (!name && !email) {
      res.status(400).json({
        error: true,
        message: "Either name or email is require to be changed",
      });
      return;
    }

    const update = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!update) {
      res.status(404).json({ error: true, message: "User not found" });
      return;
    }

    const updateUser = update?.toObject();

    if (!updateUser) {
      res.status(500).json({ error: true, message: "Failed to update user" });
      return;
    }

    const { password: pass, refreshToken: refresh, ...rest } = updateUser;

    res.status(200).json({
      error: false,
      msg: "successfully updated",
      rest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get user detail

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      res.status(401).json({
        message: "Invalid or missing user ID",
      });
      return;
    }

    const getUser = await User.findById(id);

    if (!getUser) {
      res.status(400).json({
        message: "user is NOT found",
      });
      return;
    }

    const getUserDetail = getUser?.toObject();
    const { password: pass, refreshToken: refresh, ...rest } = getUserDetail;

    res.status(200).json({
      message: "successfuly get user",
      rest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

// delete account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      res.status(401).json({
        message: "Invalid or missing user ID",
      });
      return;
    }

    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      res.status(400).json({
        message: "user is not found",
      });
      return;
    }

    res.status(201).json({
      message: "scessfully delete user account",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all user
