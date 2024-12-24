import React from 'react';
import { Heart, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ 
  title = "G+2, Real Estate",
  location = "Addis Ababa, Goffa",
  price = 149,
  bedrooms = 3,
  bathrooms = 2,
  squareFeet = 95
}) => {
  return (
    <div className="max-w-sm rounded-lg bg-white shadow-sm">
      {/* Image Container */}
      <div className="relative">
        <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
          {/* Placeholder image representation */}
          <div className="text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
          <Heart className="w-5 h-5 text-blue-500" />
        </button>

        {/* More Options */}
        <button className="absolute bottom-3 right-3 p-1">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600 text-sm">{location}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">${price}</span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="grid items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{bedrooms} Bed room</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{bathrooms} Bath room</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span className="text-sm">{squareFeet} square feet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;