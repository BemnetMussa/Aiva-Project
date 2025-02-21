import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../models/User";

export const generateToken = async (
  user: IUser,
  expiresIn: SignOptions["expiresIn"]
): Promise<string> => {
  const option: SignOptions = { expiresIn };

  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET!,
    option
  );
};

export const generateAccessToken = (user: IUser) => generateToken(user, "15m");
export const generateRefreshToken = (user: IUser) => generateToken(user, "7d");

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
