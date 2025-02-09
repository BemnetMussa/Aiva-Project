import React from 'react';
import { Heart, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  _id: string; // Add the property ID
  title?: string;
  location?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  description?: string;
  type?: string;
  status?: string;
  onFavoritesClick?: (id: string) => void; // Add this prop
}


const PropertyCard = ({
  _id,
  title = "G+2, Real Estate",
  location = "Addis Ababa, Goffa",
  price = 149,
  bedrooms = 3,
  bathrooms = 2,
  squareFeet = 95,
  description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quo odit et porro aut voluptatem saepe suscipit accusamus voluptas quam!",
  type = "Rent",
  status = "Available",
  onFavoritesClick, // Destructure the prop
}: PropertyCardProps) => {
  
  const handleFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior
    if (onFavoritesClick) {
      onFavoritesClick(_id); // Call the callback with the property ID
    }
  };
  return (
    <div className="w-[401px] h-[599px] rounded-lg bg-white shadow-sm">
      {/* Image Container */}
      <div className="relative p-2">
        <div className="h-[329px] w-full bg-gray-200 p-32 flex items-center justify-center">
          {/* Placeholder image representation */}
          <div className="text-gray-400">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorites} // Use the new handler
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
        >
          <Heart className="w-5 h-5 text-blue-500" />
        </button>

        <div className="absolute top-4 left-4 p-2 bg-green-400 rounded-full shadow-md flex gap-1">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0916 7.20002C13.0916 10.7131 10.3875 13.5182 7.10324 13.5182C3.81903 13.5182 1.11487 10.7131 1.11487 7.20002C1.11487 3.68693 3.81903 0.881836 7.10324 0.881836C10.3875 0.881836 13.0916 3.68693 13.0916 7.20002ZM4.31394 7.20002C4.31394 8.78112 5.53968 10.1057 7.10324 10.1057C8.6668 10.1057 9.89254 8.78112 9.89254 7.20002C9.89254 5.61891 8.6668 4.29435 7.10324 4.29435C5.53968 4.29435 4.31394 5.61891 4.31394 7.20002Z"
              fill="#00FF0D"
              stroke="black"
            />
          </svg>

          <p>{status}</p>
        </div>

        <div className="absolute bottom-3 left-4 p-2 bg-white rounded-full shadow-md">
          <p>{type}</p>
        </div>

        {/* More Options */}
        <button className="absolute bottom-3 right-3 p-1">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 gap-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className=" text-slate-300 text-sm">{location}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">${price}</span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex justify-start gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-6 h-6" />
            <span className="text-sm">{bedrooms} Bed room</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-6 h-6" />
            <span className="text-sm">{bathrooms} Bath room</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-6 h-6" />
            <span className="text-sm">{squareFeet} square feet</span>
          </div>
        </div>

        {/* Description */}
        <div className="pt-3">
          <p className="line-clamp-3 text-slate-300">{description}</p>
        </div>

        {/* buttons */}
        <div className="flex justify-center text-white font-semibold pt-3 gap-3">
          <button className="px-14 py-3 bg-primary rounded-lg">Message</button>
          <button className="px-9 py-3 bg-primary rounded-lg">
            Show number
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;