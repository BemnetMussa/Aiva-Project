import React, { useState } from "react";
import { Star } from "lucide-react";
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
   const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((favorite) => favorite._id === _id);

  const handleCategorySelect = (categoryId: string) => {
    if (onFavoritesClick) {
      onFavoritesClick(_id, categoryId); // Pass both propertyId and categoryId
    }
    setShowCategories(false);
  };

  return (
    <div className="w-[451px] md:h-[649px] bg-gray-50 md:rounded-lg overflow-hidden sm:rounded-none">
      {/* Image Section */}
      <div className="relative w-2/5 sm:w-full h-full sm:h-auto">
        <div className="h-full md:h-auto md:aspect-[4/3]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <svg
                className="w-12 h-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div
          className={`absolute top-2 left-2 px-2 py-1 text-white rounded-full text-xs font-semibold flex gap-1 ${status === "Available" ? "bg-green-500" : "bg-gray-500 text-gray-200"}`}
        >
          <p className="font-semibold">{status}</p>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setShowCategories(!showCategories)}
          className={`absolute top-2 right-2 w-8 h-8  rounded-full flex items-center justify-center ${isFavorite ? "bg-red-500" : "text-blue-400 bg-white"}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            className={`${isFavorite ? "text-white" : "text-blue-400"}`}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Categories Popup */}
        {showCategories && (
          <div className="absolute top-12 right-2 bg-white p-4 rounded-lg shadow-lg">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Property Type Badge */}
        <div className="absolute bottom-2 left-2 font-semibold bg-[#D0D5D8] px-2 py-1 rounded-full text-xs">
          {type}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Title, Location, and Price Section */}
        <div>
          <div className="flex justify-between items-start mb-1">
            <h2 className="font-medium text-base text-xl">{title}</h2>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating}</span>
            </div>
          </div>
          <div className="flex justify-between flex-row">
            <p className="text-gray-500 mb-3 text-sm">{location}</p>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold">${price}</span>
              <span className="text-gray-500 text-sm">/night</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 text-md text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <span>{bedrooms} Bed room</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{bathrooms} Bath room</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{squareFeet} square feet</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-gray-500 text-sm mb-3 line-clamp-3 pr-5">
          {description}
        </div>

        {/* Buttons */}
        <div className="md:flex hidden gap-4 w-full mt-auto">
          <button className="flex-1 md:px-6 py-2 md:py-3 bg-primary-color text-white text-lg font-semibold rounded-lg">
            Message
          </button>
          <button className="flex-1 md:px-6 py-2 md:py-3 bg-primary-color text-white text-lg font-semibold rounded-lg">
            Show Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
