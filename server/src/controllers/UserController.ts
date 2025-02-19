import { Request, Response } from "express";
import User from "../models/User";

// update profile

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id) {
      res.status(400).json({ error: true, message: "id is require" });
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

    const { password, ...rest } = updateUser;

    console.log(rest);

    res.status(200).json({
      error: false,
      msg: "successfully updated",
      rest,
    });
  } catch (error) {
    console.log(error);
  }
};

// get user detail

// delete account

// get all user
