import React from 'react';
import { ChevronDown, Search, ShoppingCart } from 'lucide-react';

const SearchForm = () => {
  return (
    <div className="flex items-center mt-10 gap-8 bg-white p-2 rounded-lg shadow-sm">
      {/* Location Dropdown */}
      <div className="relative flex-1">
        <div>
            <label className="block text-xs text-gray-500">Location</label>
            <select className="border-none p-0 text-sm focus:ring-0 pr-6 bg-transparent">
              <option>Bole</option>
              <option>Nifas Silk Lafto</option>
              <option>Kirkos</option>
              <option>Akaki Kaliti</option>
            </select>
          </div>
      </div>

      {/* Check In */}
      <div className="relative flex-1">
        <div className="flex items-center border-r border-gray-200 pr-4">
          <div>
            <label className="block text-xs text-gray-500">Check In</label>
            <input
              type="date"
              className="border-none p-0 text-sm focus:ring-0"
              defaultValue="2024-01-25"
            />
          </div>
        </div>
      </div>

      {/* Check Out */}
      <div className="relative flex-1">
        <div className="flex items-center border-r border-gray-200 pr-4">
          <div>
            <label className="block text-xs text-gray-500">Check Out</label>
            <input
              type="date"
              className="border-none p-0 text-sm focus:ring-0"
              defaultValue="2024-01-28"
            />
          </div>
        </div>
      </div>

      {/* Guests */}
      <div className="relative flex-1">
        <div className="flex items-center">
          <div>
            <label className="block text-xs text-gray-500">Guests</label>
            <select className="border-none p-0 text-sm focus:ring-0 pr-6 bg-transparent">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Sort Button */}
        <button className="flex items-center gap-1 px-3 py-2 bg-slate-300 hover:bg-slate-500 hover:text-white rounded-md">
          <span className="text-sm">Sort by:</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Search Button */}
        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchForm;