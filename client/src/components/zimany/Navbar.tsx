import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-start">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path 
                    d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">Ziemny</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/accomodations" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Accommodations
            </Link>
            <Link 
              to="/bookings" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Bookings
            </Link>
            <Link 
              to="/favourites" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Favourites
            </Link>
            <Link 
              to="/host" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Host accommodations
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-end space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="mobile-menu-button p-4 focus:outline-none">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/accomodations" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Accommodations
          </Link>
          <Link 
            to="/bookings" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Bookings
          </Link>
          <Link 
            to="/favourites" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Favourites
          </Link>
          <Link 
            to="/host" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Host accommodations
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;