import React from "react";
import { Heart, Bed, Bath, Square } from "lucide-react";

// import { image } from 'image-downloader';


interface PropertyCardProps {
  _id: string;
  title?: string;
  location?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  description?: string;
  type?: string;
  status?: string;
  image?: string;
  rating?: number;
  onFavoritesClick?: (id: string) => void;
}

const PropertyCard = ({
  _id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  description,
  type,
  status,
  image,
  onFavoritesClick, // Destructure the prop
}: PropertyCardProps) => {
  const handleFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onFavoritesClick) {
      onFavoritesClick(_id);
    }
  };

  return (
    <div className="w-[401px] bg-white h-[599px] overflow-hidden shadow flex flex-col justify-between ">
      {/* Image Container */}
      <div className="relative">
        <div className="aspect-[4/3] bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
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

        <div></div>

        {/* Status Badge */}
        <div className="absolute top-2 left-2 bg-green-400 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {status}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorites}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
        >
          <Heart className="w-5 h-5 text-blue-400" />
        </button>

        {/* Type Badge */}
        <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-full text-sm">
          {type}
        </div>

        {/* More Options */}
        <button className="absolute bottom-2 right-2 p-1">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      <div>
        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-gray-400 text-sm">{location}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">${price}</span>
              <span className="text-gray-500 text-sm">/night</span>
            </div>
          </div>

          {/* Property Features */}
          <div className="flex gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{bedrooms} Bed room</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{bathrooms} Bath room</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{squareFeet} square feet</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-3 mb-14">
            {description}
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 ">
            <button className="w-full bg-blue-400 text-white py-4 rounded-lg font-medium">
              Message
            </button>
            <button className="w-full bg-blue-400 text-white py-4 rounded-lg font-medium">
              Show Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
