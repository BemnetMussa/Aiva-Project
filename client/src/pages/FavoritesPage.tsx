import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

interface SubCategory {
  name: string;
  createdAt: Date;
}

interface Category {
  _id: string;
  name: string;
  subCategories: SubCategory[];
  userId: string;
  createdAt: Date;
}

interface Property {
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

export const FavoritesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [wishlistCategory, setWishlistCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(
          "http://localhost:5000/api/categories",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Find or create wishlist category
        let wishlist = categoriesData.find(
          (category: Category) => category.name.toLowerCase() === "wishlist"
        );

        if (!wishlist) {
          // Create wishlist category if it doesn't exist
          const response = await fetch(
            "http://localhost:5000/api/categories/create",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: "Wishlist" }),
            }
          );
          wishlist = await response.json();
          setCategories([...categoriesData, wishlist]);
        }

        setWishlistCategory(wishlist);
        setActiveCategory(wishlist._id);

        // Fetch favorites
        const favoritesResponse = await fetch(
          "http://localhost:5000/api/favorites",
          {
            credentials: "include",
          }
        );
        const favoritesData = await favoritesResponse.json();
        setProperties(favoritesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addNewCategory = async (name: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories/create",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Updated filtering logic
  const filteredProperties = properties.filter((property) => {
    if (activeCategory === wishlistCategory?._id) {
      return true; // Show all favorites in wishlist
    } else {
      return property.categoryId === activeCategory; // Show only properties matching the selected category
    }
  });

  return (
    <div className="flex relative overflow-hidden flex-col items-center h-[100vh] w-full pt-14 bg-[#f3f3f3] border border-cyan-400 border-solid shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      <Navbar />

      <div className="items-start p-8 absolute left-12 top-24 flex flex-col gap-4">
        <div className="flex gap-8">
          {categories.map((category) => (
            <div key={category._id} className="flex flex-col gap-2">
              <h2
                className={`border-b-4 cursor-pointer font-bold ${
                  activeCategory === category._id
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => {
                  setActiveCategory(category._id);
                }}
              >
                {category.name}
              </h2>
            </div>
          ))}

          <button
            className="text-primary-color hover:text-blue-700 font-bold"
            onClick={() => {
              const name = prompt("Enter new category name:");
              if (name) {
                addNewCategory(name);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="#37BDF6"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-20 items-center justify-center">
        <div className="mt-24 mx-auto sm:w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-1">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} {...property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
