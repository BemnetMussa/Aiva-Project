import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateToken";

interface UserPayload {
  id: string;
  user: string;
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;
  console.log("user token", token);

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    const decoded = verifyToken(token) as UserPayload;

    (req as any).user = decoded;
    console.log("decoded ", decoded);
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
  