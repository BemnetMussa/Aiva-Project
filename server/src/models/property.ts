// (title = "G+2, Real Estate"),
//   (location = "Addis Ababa, Goffa"),
//   (price = 149),
//   (bedrooms = 3),
//   (bathrooms = 2),
//   (squareFeet = 95),
//   (description = "This is a beautiful house located in the heart of Addis Ababa, Goffa. It has 3 bedrooms, 2 bathrooms, and a total of 95 square feet."),
//   (type = "Rent"),
//   (status = "Available");

import mongoose from "mongoose";
import { useRevalidator } from "react-router-dom";

const propertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  bedrooms: {
    type: Number,
    required: true,
  },

  bathrooms: {
    type: Number,
    required: true,
  },

  squareFeet: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
