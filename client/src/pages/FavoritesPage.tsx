import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  setActiveCategory,
  deleteCategory,
  fetchCategories,
} from "../redux/slices/categorySlice";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import { Plus, X } from "lucide-react";

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

  const handleCategoryDelete = (categoryId: string) => {
    dispatch(deleteCategory(categoryId) as any);
    dispatch(fetchCategories() as any);
  };
  // Filter properties based on active category
  const filteredProperties = favorites.filter((property) => {
    if (activeCategory === wishlistCategory?._id) {
      return true;
    }
    return property.categoryId === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-12 max-w-7xl">
        {/* Categories Section - Improved scrolling and mobile spacing */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <div key={category._id} className="relative group">
                {/* category remove button */}
                <div
                  onClick={() => handleCategoryDelete(category._id)}
                  className="text-black absolute -right-2 rounded-xl text-[14px] hidden group-hover:block"
                >
                  <X size={10} />
                </div>

                <button
                  onClick={() => handleCategoryChange(category._id)}
                  className={`
                  whitespace-nowrap font-medium sm:font-bold pb-2 transition-all text-sm sm:text-base
                  ${
                    activeCategory === category._id
                      ? "border-b-4 border-black"
                      : "border-b-4 border-transparent hover:border-gray-300"
                  }
                `}
                >
                  {category.name}
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                const name = prompt("Enter new category name:");
                if (name) handleCreateCategory(name);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0"
              aria-label="Add new category"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Properties Grid - Improved responsiveness */}
        <div className="w-full mt-4 sm:mt-8">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-2">
                No properties found in this category.
              </p>
              <p className="text-sm text-gray-400">
                Add properties to see them here
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
