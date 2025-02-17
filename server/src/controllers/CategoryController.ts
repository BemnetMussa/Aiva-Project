// controllers/CategoryController.ts
import { Request, Response } from "express";
import Category from "../models/UserCategory";
import Property from "../models/Property";

// Extend Request type to include user
interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}


interface ICategory {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

// Get all categories for current user
export const getCategories = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id; // Get the user ID from the token

    const categories = await Category.find({ userId: userId }).sort({
      createdAt: -1,
    });
    res.json(categories);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};



// Create new category
export const createCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id; // Get the user ID from the token

    console.log("userId", req.user?._id);
    const existingCategory = await Category.findOne({
      name: req.body.name,
      userId: userId
    });

    if (existingCategory) {
      res.status(400).json({ message: "Category name already exists" });
      return;
    }

    const category = await Category.create({
      name: req.body.name,
      userId: userId,
    });

    res.status(201).json(category);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error creating category", error: error.message });
  }
};

// // Delete category
// export const deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findOne({
//       _id: req.params.id,
//       userId: req.user._id,
//     });

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     await Property.updateMany(
//       { categoryId: req.params.id },
//       { $unset: { categoryId: "", subCategoryName: "" } }
//     );

//     await Category.deleteOne({ _id: req.params.id });
//     res.json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting category", error: error.message });
//   }
// };
