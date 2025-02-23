import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  setActiveCategory,
} from "../redux/slices/categorySlice";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import { Plus } from "lucide-react";

// Define interfaces for Category, favorite, and Property
interface Category {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

export interface favoriteProperty {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  categoryId: string;
  status: string;
}

// Define RootState type for proper TypeScript support
interface RootState {
  categories: {
    categories: Category[];
    activeCategory: string;
    wishlistCategory: Category | null;
  };
  favorites: {
    favorites: favoriteProperty[];
    status: string;
    error: string | null;
  };
}

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const activeCategory = useSelector(
    (state: RootState) => state.categories.activeCategory
  );
  const wishlistCategory = useSelector(
    (state: RootState) => state.categories.wishlistCategory
  );

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );


  const handleCreateCategory = (name: string) => {
    if (name.trim()) {
      dispatch(createCategory(name) as any);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId) as any);
  };

  // Filter properties based on active category
  const filteredProperties = favorites.filter((property) => {
    if (activeCategory === wishlistCategory?._id) {
      return true;
    }
    return property.categoryId === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Navbar />

      <main className="container mx-auto px-4 pt-24">
        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex items-center gap-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`
                  whitespace-nowrap font-bold pb-2 transition-all
                  ${
                    activeCategory === category._id
                      ? "border-b-4 border-black"
                      : "border-b-4 border-transparent hover:border-gray-300"
                  }
                `}
              >
                {category.name}
              </button>
            ))}

            <button
              onClick={() => {
                const name = prompt("Enter new category name:");
                if (name) handleCreateCategory(name);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Add new category"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}

          {filteredProperties.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No properties found in this category.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
