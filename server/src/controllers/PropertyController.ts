import { Request, Response } from "express";

import Property from "../models/Property";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3LocationFilterSensitiveLog,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
// import sharp from "sharp";
// // wrap the req.file.buffer by the sharp and recrate the buffer which allows us to resize the image
// const buffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "contain"}).toBuffer()
import dotenv from "dotenv";
import crypto from "crypto";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { error } from "console";

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

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const fetchProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const properties = await Property.find({}); // Get all properties from the database

    for (const property of properties) {
      // For each post, generate a signed URL and save it to the post object
      property.image = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: property.image,
        }),
        { expiresIn: 60 } // 60 seconds
      );
    }

    // console.log(properties);

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  const imageName = randomImageName();
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file?.buffer,
    ContentType: req.file?.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    console.log("uploaded successfully", response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }

  const {
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    description,
    phoneNumber,
    type,
    status,
  } = req.body;

  const userId = (req as any).user?.id; // Get the user ID from the token
  
  

  const formattedPrice = price.replace(/,/g, "")

  try {
    if (!userId) {  
      res.status(400).json({ message: "Try again, an error occurred" });
      return;
    }

    const property = await Property.create({
      userId,
      title,
      location,
      price: formattedPrice.trim(),
      bedrooms,
      bathrooms,
      squareFeet,
      phoneNumber,
      description,
      type,
      status,
      image: imageName,
    });
    console.log(property);
    res.status(202).json({message: "property added successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const userProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const properties = await Property.find({ userId });
    for (const property of properties) {
      // For each post, generate a signed URL and save it to the post object
      property.image = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: property.image,
        }),
        { expiresIn: 60 } // 60 seconds
      );
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching user properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const propertyId = req.query.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    const deleteParams = {
      Bucket: bucketName,
      Key: property.image,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    await Property.deleteOne({ _id: propertyId });

    res.status(202).json({ message: "Property deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting property:", error);
    res
      .status(500)
      .json({ message: "Error deleting property", error: error.message });
  }
};

export const switchPropertyState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const propertyId = req.query.id;
    const propertyStatus = req.query.status;

    // updated value
    let updatedValue = propertyStatus == "Unavailable" ? "Available" : "Unavailable"

    await Property.updateOne({_id: propertyId }, { status: updatedValue });

    res.status(202).json({message: "Property updated successfully"})
  } catch (error: any) {
    
    console.error("Error switching status property", error)
    res.status(500).json({message: "Error deleting property", error: error.message})
  }
}