import { Request, Response } from "express";
import Favorites from "../models/Favorites";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "../models/Property";
import Category from "../models/UserCategory";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3LocationFilterSensitiveLog,
} from "@aws-sdk/client-s3";


dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const secretAccesskey = process.env.SECRET_ACCESS_KEY;
const accessKey = process.env.ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey || "",
    secretAccessKey: secretAccesskey || "",
  },
  region: bucketRegion || "",
});

export const userFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    // getting the Favorites based on userId
    const favoritesId = await Favorites.find({ userId }).lean();

    // filtering the propertyIds of the user
    const propertyIds = favoritesId.map((favorite) => favorite.propertyId);

    // fetching the object form the properties
    const properties = await Property.find({
      _id: { $in: propertyIds },
    }).lean();

    // Generate signed URLs in parallel
    if (properties.length > 0) {
      const propertiesWithImages = await Promise.all(
        properties.map(async (property) => {
          if (!property.image) {
            console.log("No image found by property", property._id);
          }

          try {
            const signedURL = await getSignedUrl(
              s3,
              new GetObjectCommand({
                Bucket: bucketName,
                Key: property.image,
              }),
              { expiresIn: 60 * 60 }
            );

            return { ...property, image: signedURL };
          } catch (error) {
            console.log(
              "Error getting signed URL for property:",
              property._id,
              error
            );
            return property;
          }
        })
      );

      res.status(200).json(propertiesWithImages);
    } else {
      console.log("No properties found for the given IDs");
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error in userFavorites:", error);
    res.status(500).json({
      message: "Failed to fetch favorite properties",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export const addToFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { propertyId, categoryId } = req.body;
    const userId = (req as any).user?.id;

    // Check if the property is already favorited by the user
    const existingFavorite = await Favorites.findOne({ userId, propertyId });
    if (existingFavorite) {
      res.status(400).json({ message: "Property already in favorites." });
      return; // Ensures function ends here without returning a value
    }

    // Find the category name using the categoryId
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    // Find the property and update its categoryId
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { categoryId: category._id },
      { new: true, lean: true }
    );

    if (!updatedProperty) {
      res.status(404).json({ message: "Property not found." });
      return;
    }

    console.log("updating this one", updatedProperty);

    // Create and save the new favorite
    const newFavorite = new Favorites({
      userId,
      propertyId,
      categoryId,
      categoryName: category.name,
    });

    await newFavorite.save();
    res.status(201).json({
      message: "Added to favorites successfully!",
      favorite: newFavorite,
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



