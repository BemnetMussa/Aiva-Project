import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import favoritesRoutes from "./routes/favoritesRoutes";
import cookieParser from "cookie-parser";

import multer from "multer";

dotenv.config();


console.log(" this is the REgion", process.env.BUCKET_REGION);

// Create Express app
const app = express();

// Middleware
app.use(
  cors({

    origin: "http://localhost:5173", 
    credentials: true, 

  })
);
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();


const storage = multer.memoryStorage();
const upload = multer({storage: storage})



// Routes
app.use("/api/users",  userRoutes);
app.use("/api/properties", upload.single("image"), propertyRoutes);
app.use("/api/favorites", favoritesRoutes)




app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
});
