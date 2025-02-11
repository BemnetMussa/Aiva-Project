import mongoose from "mongoose";

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

  phoneNumber: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
