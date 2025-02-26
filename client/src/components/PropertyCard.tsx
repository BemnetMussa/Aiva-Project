import React, { useState } from "react";
import {
  Star,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Home,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PropertyCardProps {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rating?: number;
  status?: string;
  type?: string;
  description: string;
  image?: string;
  onFavoritesClick?: (propertyId: string, categoryId: string) => void;
}

interface Category {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

const PropertyCard = ({
  _id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  rating = 5.0,
  status = "Available",
  type = "",
  description,
  image,
  onFavoritesClick,
}: PropertyCardProps) => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [showCategories, setShowCategories] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = favorites.some((favorite) => favorite._id === _id);

  const handleCategorySelect = (categoryId: string) => {
    if (onFavoritesClick) {
      onFavoritesClick(_id, categoryId);
    }
    setShowCategories(false);
  };

  // Format price with commas for thousands
  const formattedPrice = price.toLocaleString();

  return (
    <div className="w-[451px] h-[649px] bg-white rounded-xl overflow-hidden flex flex-col shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Image Section with gradient overlay for better text visibility */}
      <div
        className="relative w-full h-[325px] overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Home className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {/* View Details Overlay - Shows on hover */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 font-medium text-blue-600 shadow-lg">
            <span>View Details</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Gradient overlay for better badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>

        {/* Status Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 text-white rounded-full text-xs font-semibold flex gap-1.5 items-center ${status === "Available" ? "bg-green-500" : "bg-gray-500"}`}
        >
          <div
            className={`w-2 h-2 rounded-full ${status === "Available" ? "bg-green-200" : "bg-gray-300"}`}
          ></div>
          <p className="font-medium">{status}</p>
        </div>

        {/* Favorite Button with animation */}
        <button
          onClick={() => setShowCategories(!showCategories)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorite ? "bg-red-500 shadow-lg" : "bg-white/90 hover:bg-white"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavorite
                ? "text-white fill-white"
                : "text-red-500 hover:scale-110"
            }`}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        {/* Categories Popup with animation */}
        {showCategories && (
          <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-xl z-10 min-w-[160px] animate-fadeIn">
            <p className="text-xs font-medium text-gray-500 mb-2">
              Add to collection:
            </p>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
                className="block w-full text-left p-2 hover:bg-blue-50 rounded text-sm transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Property Type Badge with improved styling */}
        <div className="absolute bottom-4 left-4 font-semibold bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-gray-800 shadow-sm">
          {type || "Residential"}
        </div>
      </div>

      {/* Content Section  */}
      <div className="flex-1 p-6 flex flex-col h-[324px] justify-between">
        {/* Title, Location, and Rating Section */}

        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-semibold text-xl text-gray-800 line-clamp-2">
              {title}
            </h2>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">
                {rating}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <p className="text-gray-500 text-sm line-clamp-1">{location}</p>
            </div>

            {/* Price Section */}
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
              <p className="text-lg font-semibold">${formattedPrice}</p>
              <span className="text-xs text-blue-500 ml-1">/mon</span>
            </div>
          </div>
        </div>

        {/* Features with improved icons */}
        <div className="grid grid-cols-3 gap-4 ">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <BedDouble className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Bedrooms</p>
              <p className="font-medium text-gray-700">{bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Bath className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Bathrooms</p>
              <p className="font-medium text-gray-700">{bathrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Home className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Area</p>
              <p className="font-medium text-gray-700">{squareFeet} sq ft</p>
            </div>
          </div>
        </div>

        {/* Description with improved styling */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xs uppercase font-medium text-gray-500 mb-2">
            Description
          </h3>
          <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
