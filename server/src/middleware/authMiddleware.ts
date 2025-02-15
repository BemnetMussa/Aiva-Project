import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
  console.log("user token", token)

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    console.log(process.env.JWT_SECRET!);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    
    (req as any).user = decoded;
    console.log("decoded ", decoded)
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Invalid token" });
  }
};
