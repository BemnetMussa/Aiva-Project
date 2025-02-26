import React, { useState } from "react";
import {
  Star,
  MapPin,
  BedDouble,
  Bath,
  Home,
  Edit,
  Trash2,
} from "lucide-react";

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
  onFavoritesClick?: (id: string) => void;
}

const HostPropertyCard = ({
  _id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  rating = 5.0,
  status = "Available",
  type = "For Rent",
  description,
  image,
  onFavoritesClick,
}: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleListing = async (propertyId: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/update",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }),
        }
      );

      if (response.ok) {
        console.log("Property Updated successfully!");
      } else {
        console.error("Failed to update try again later.");
      }
    } catch (error) {
      console.error("Error occur trying to update property:", error);
    }
  };

  const handleRemoveListing = async (propertyId: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/delete",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }),
        }
      );

      if (response.ok) {
        console.log("Property Updated successfully!");
      } else {
        console.error("Failed to update try again later.");
      }
    } catch (error) {
      console.error("Error occur trying to update property:", error);
    }
  };

  const handlePropertyEdit = async (propertyId: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/edit",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }),
        }
      );

      if (response.ok) {
        console.log("Property Updated successfully!");
      } else {
        console.error("Failed to update try again later.");
      }
    } catch (error) {
      console.error("Error occur trying to update property:", error);
    }
  };

  return (
    <div className="w-[451px] h-[689px] bg-white rounded-xl overflow-hidden flex flex-col shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
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

        {/* Status Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 text-white rounded-full text-xs font-semibold flex gap-1.5 items-center ${
            status === "Available" ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              status === "Available" ? "bg-green-200" : "bg-gray-300"
            }`}
          ></div>
          <p className="font-medium">
            {status === "Available" ? "Listed" : "Delisted"}
          </p>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => handlePropertyEdit(_id)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-all duration-300"
        >
          <Edit className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
      </div>

      {/* Content Section */}
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
              <p className="text-lg font-semibold">${price.toLocaleString()}</p>
              <span className="text-xs text-blue-500 ml-1">/night</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-3 gap-4">
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

        {/* Description Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xs uppercase font-medium text-gray-500 mb-2">
            Description
          </h3>
          <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
        </div>

        {/* Host Buttons */}
        <div className="flex flex-col gap-2 font-semibold text-xl">
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => handleListing(_id)}
          >
            List / Delist
          </button>
          <button
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            onClick={() => handleRemoveListing(_id)}
          >
            Remove Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostPropertyCard;
