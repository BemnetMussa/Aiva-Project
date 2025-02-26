import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateToken";
import { decode } from "punycode";

interface UserPayload {
  id: string;
  user: string;
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try { 
    const decoded = verifyToken(token) as UserPayload;
    console.log("decoded ", decoded);
    (req as any).user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
