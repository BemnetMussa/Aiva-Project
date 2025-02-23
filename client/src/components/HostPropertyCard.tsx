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
  const handleListing: (propertyId: string) => Promise<void> = async (
    propertyId
  ) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/update",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }), // Send the property ID to the backend
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

  const handleRemoveListing: (propertyId: string) => Promise<void> = async (
    propertyId
  ) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/delete",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }), // Send the property ID to the backend
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

  const handlePropertyEdit: (propertyId: string) => Promise<void> = async (
    propertyId
  ) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/edit",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }), // Send the property ID to the backend
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
            <p className="font-semibold">
              {status === "available" ? "Listed" : "Delisted"}
            </p>
          </div>

         

          {/* Property Type Badge */}
          <div className="absolute bottom-2 left-2 font-semibold bg-[#D0D5D8] px-2 py-1 rounded-full text-xs">
            {type}
          </div>

          {/* Property edit Icon */}
          <div className="absolute bottom-2 right-2 py-1">
            <button
              onClick={() => {
                handlePropertyEdit(_id);
              }}
            >
              <svg
                width="38"
                height="35"
                viewBox="0 0 38 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0467 5.83285H6.19879C5.37678 5.83285 4.58844 6.14014 4.00719 6.68712C3.42594 7.2341 3.0994 7.97597 3.0994 8.74952V29.1662C3.0994 29.9397 3.42594 30.6816 4.00719 31.2286C4.58844 31.7756 5.37678 32.0828 6.19879 32.0828H27.8945C28.7165 32.0828 29.5049 31.7756 30.0861 31.2286C30.6674 30.6816 30.9939 29.9397 30.9939 29.1662V18.9578M28.6694 3.64535C29.2859 3.06519 30.1221 2.73926 30.9939 2.73926C31.8658 2.73926 32.702 3.06519 33.3185 3.64535C33.935 4.22551 34.2813 5.01238 34.2813 5.83285C34.2813 6.65332 33.935 7.44019 33.3185 8.02035L18.5964 21.8745L12.3976 23.3328L13.9473 17.4995L28.6694 3.64535Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_200_371)">
                  <path
                    d="M6.25997 21.0866C6.25997 21.6547 5.77644 22.1152 5.17997 22.1152C4.5835 22.1152 4.09997 21.6547 4.09997 21.0866C4.09997 20.5185 4.5835 20.0579 5.17997 20.0579C5.77644 20.0579 6.25997 20.5185 6.25997 21.0866ZM8.05997 17.3149C7.4635 17.3149 6.97997 17.7754 6.97997 18.3435C6.97997 18.9116 7.4635 19.3722 8.05997 19.3722C8.65644 19.3722 9.13997 18.9116 9.13997 18.3435C9.13997 17.7754 8.65644 17.3149 8.05997 17.3149ZM2.29997 17.3149C1.7035 17.3149 1.21997 17.7754 1.21997 18.3435C1.21997 18.9116 1.7035 19.3722 2.29997 19.3722C2.89644 19.3722 3.37997 18.9116 3.37997 18.3435C3.37997 17.7754 2.89644 17.3149 2.29997 17.3149ZM5.17997 14.5718C4.5835 14.5718 4.09997 15.0324 4.09997 15.6005C4.09997 16.1686 4.5835 16.6291 5.17997 16.6291C5.77644 16.6291 6.25997 16.1686 6.25997 15.6005C6.25997 15.0324 5.77644 14.5718 5.17997 14.5718ZM23.54 4.28538C23.54 4.66412 23.2176 4.97114 22.82 4.97114L20.2379 4.97114L17.7314 7.35932L15.782 18.2278C15.6925 18.734 15.3138 19.1503 14.8004 19.3066C14.2871 19.4629 13.725 19.3331 13.3439 18.9702L4.52387 10.5695C4.14222 10.2062 4.00589 9.67013 4.17066 9.18072C4.33543 8.69132 4.77365 8.33072 5.30597 8.24652L16.7126 6.38896L19.22 4.00165C19.4891 3.74327 19.8557 3.59845 20.2379 3.59962L22.82 3.59962C23.2176 3.59962 23.54 3.90664 23.54 4.28538ZM16.1789 7.86764L5.53997 9.60005L14.36 18.0007L16.1789 7.86764Z"
                    fill="#171A1F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_200_371">
                    <rect
                      width="24"
                      height="22.8588"
                      fill="white"
                      transform="translate(0 0.361328)"
                    />
                  </clipPath>
                </defs>
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

          {/* Host Buttons */}
          <div className="flex flex-col gap-4 w-full mt-auto">
            <button
              className="flex-1 w-full py-2 md:py-3
             bg-primary-color text-white text-xl
              rounded-lg sm:gap-"
              onClick={(e) => handleListing(_id)}
            >
              List / Delist
            </button>
            <button
              className="flex-1 w-full py-2
              md:py-3 bg-primary-color
              text-white text-xl
              rounded-lg"
              onClick={(e) => handleRemoveListing(_id)}
            >
              Remove Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPropertyCard;
