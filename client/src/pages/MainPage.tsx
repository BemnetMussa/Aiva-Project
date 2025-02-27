import * as React from "react";
import PropertyCard from "../components/PropertyCard";
import SearchForm from "../components/SearchForm";
import { Pagination } from "../components/Pagination";
import { SearchFormData } from "../components/types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlice";
import { fetchFavorites } from "../redux/slices/favoriteSlice";
import { addFavorite } from "../redux/slices/favoriteSlice";
import { useAppDispatch } from "../redux/hooks";


interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  type: string;
  status: string;
}

export const ZimanyHome: React.FC = () => {
  const handleSearch = (data: SearchFormData) => {
    console.log("Search data:", data);
  };

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
  };

  const [properties, setProperties] = useState<Property[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    dispatch(fetchCategories() as any);
    dispatch(fetchFavorites() as any);
    fetchProperties();
  }, [dispatch]);



    const handleAddFavoriteClick = async (
      propertyId: string,
      categoryId: string
    ) => {
      try {
        await dispatch(addFavorite({ propertyId, categoryId })).unwrap();
        // After successful addition, refresh favorites
        dispatch(fetchFavorites() as any);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    };
  

  return (
    <div className="flex overflow-hidden flex-col items-center w-full pt-14 bg-white border">
      {/* Navbar section */}
      <Navbar />

      {/* <div className="flex relative flex-col h-[75vh] items-center self-stretch px-20 pt-28 pb-40 w-full text-center text-white max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="\welcom_image.png"
          alt="Welcome background"
          className="object-cover absolute inset-0 size-full h-[90%]"
        />
        <div className="flex mt-10 relative flex-col mb-0 ml-8 max-w-full w-[721px] max-md:mb-2.5">
          <h1 className="self-center text-6xl font-extrabold leading-none max-md:max-w-full max-md:text-4xl">
            Welcome to dxios
          </h1>
          <p className="text-xl font-medium leading-8 max-md:max-w-full">
            <br />
            Your Gateway to Unique and Affordable Stays
            <br />
            Discover incredible homes and unforgettable experiences around the
            world.
          </p>
        </div>
      </div> */}

      <SearchForm />
      <div className="flex items-center justify-center">
        <div className="mt-24 mx-auto sm:w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-10 gap-1">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                {...property}
                onFavoritesClick={handleAddFavoriteClick} // Pass the function directly
              />
            ))}
          </div>
        </div>
      </div>
      {/* Footer section */}
      <div className="flex flex-col justify-center items-center self-stretch px-16 py-24 mt-5 bg-gray-50 max-md:px-5 max-md:max-w-full">
        <Footer />
      </div>
    </div>
  );
};
