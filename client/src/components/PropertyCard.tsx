import React from "react";
import { Star } from "lucide-react";

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
  type = "For Rent",
  description,
  image,
  onFavoritesClick,
}: PropertyCardProps) => {
  return (
    <div className=" w-[451px] md:h-[649px] bg-gray-50 md:rounded-lg overflow-hidden sm:rounded-none ">
      {/* Card Container - Flex row on mobile, column on larger screens */}
      <div className="flex flex-row sm:flex-col h-full">
        {/* Image Section - Takes full height on mobile */}
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
            className={`absolute top-2 left-2 px-2 py-1 text-white rounded-full text-xs font-semibold flex gap-1 ${
              status === "Available"
                ? "bg-green-500"
                : "bg-gray-500 text-gray-200"
            }`}
          >
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4767 6.81818C12.4767 10.3313 9.77259 13.1364 6.48837 13.1364C3.20416 13.1364 0.5 10.3313 0.5 6.81818C0.5 3.3051 3.20416 0.5 6.48837 0.5C9.77259 0.5 12.4767 3.3051 12.4767 6.81818ZM3.69907 6.81818C3.69907 8.39929 4.92481 9.72385 6.48837 9.72385C8.05193 9.72385 9.27767 8.39929 9.27767 6.81818C9.27767 5.23708 8.05193 3.91251 6.48837 3.91251C4.92481 3.91251 3.69907 5.23708 3.69907 6.81818Z"
                fill="none"
                stroke="black"
              />
            </svg>
            <p className="font-semibold">{status}</p>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavoritesClick?.(_id);
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-blue-400"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10.78V8C21 6.35 19.65 5 18 5L14 5C13.23 5 12.53 5.3 12 5.78C11.47 5.3 10.77 5 10 5L6 5C4.35 5 3 6.35 3 8L3 10.78C2.39 11.33 2 12.12 2 13L2 19H4L4 17L20 17V19L22 19V13C22 12.12 21.61 11.33 21 10.78ZM14 7H18C18.55 7 19 7.45 19 8V10H13L13 8C13 7.45 13.45 7 14 7ZM5 8C5 7.45 5.45 7 6 7L10 7C10.55 7 11 7.45 11 8L11 10L5 10L5 8ZM4 15L4 13C4 12.45 4.45 12 5 12L19 12C19.55 12 20 12.45 20 13V15L4 15Z"
                  fill="#171A1F"
                />
              </svg>
              <span>{bedrooms} Bed room</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.26 18.7604C5.26 19.3569 4.77647 19.8404 4.18 19.8404C3.58353 19.8404 3.1 19.3569 3.1 18.7604C3.1 18.1639 3.58353 17.6804 4.18 17.6804C4.77647 17.6804 5.26 18.1639 5.26 18.7604Z"
                  fill="#171A1F"
                />
                <path
                  d="M7.06 14.8004C6.46353 14.8004 5.98 15.2839 5.98 15.8804C5.98 16.4769 6.46353 16.9604 7.06 16.9604C7.65647 16.9604 8.14 16.4769 8.14 15.8804C8.14 15.2839 7.65647 14.8004 7.06 14.8004Z"
                  fill="#171A1F"
                />
              </svg>
              <span>{bathrooms} Bath room</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.25 2.625L3.75 2.625C2.925 2.625 2.25 3.4125 2.25 4.375L2.25 16.625C2.25 17.5875 2.925 18.375 3.75 18.375L14.25 18.375C15.075 18.375 15.75 17.5875 15.75 16.625L15.75 4.375C15.75 3.4125 15.075 2.625 14.25 2.625ZM14.25 16.625L3.75 16.625L3.75 4.375L14.25 4.375L14.25 16.625Z"
                  fill="#171A1F"
                />
              </svg>
              <span>{squareFeet} square feet</span>
            </div>
          </div>

          {/* Description - Hidden on mobile */}
          <div className=" text-gray-500 text-sm mb-3 line-clamp-3 pr-5">
            {description}
          </div>

          {/* Buttons */}
          <div className="md:flex hidden gap-4 w-full mt-auto">
            <button className="flex-1 md:px-6 py-2 md:py-3 bg-primary-color text-white text-lg font-semibold rounded-lg sm:gap-">
              Message
            </button>
            <button className="flex-1 md:px-6 py-2 md:py-3 bg-primary-color text-white text-lg font-semibold rounded-lg">
              Show Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
