import * as React from "react";
import PropertyCard from "../components/PropertyCard";
import SearchForm from "../components/SearchForm";
import { Pagination } from "../components/Pagination";
import { SearchFormData } from "../components/types";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchProperties = async () => {
      console.log("hello form the frontend fetch proeprties");
      try {
        const response = await fetch("http://localhost:5000/api/properties", {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleFavoritesClick: (propertyId: string) => Promise<void> = async (propertyId) => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId }), // Send the property ID to the backend
      });

      if (response.ok) {
        console.log("Property added to favorites successfully!");
      } else {
        console.error("Failed to add property to favorites.");
      }
    } catch (error) {
      console.error("Error adding property to favorites:", error);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col items-center w-full pt-14 bg-white border border-cyan-400 border-solid shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      {/* Navbar section */}
      <Navbar />

      <div className="flex relative flex-col h-[75vh] items-center self-stretch px-20 pt-28 pb-40 w-full  text-center text-white max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="\welcom_image.png"
          alt="Welcome background"
          className="object-cover absolute inset-0 size-full h-[90%]"
        />
        <div className="flex mt-10 relative flex-col mb-0 ml-8 max-w-full w-[721px] max-md:mb-2.5">
          <h1 className="self-center text-6xl font-extrabold leading-none max-md:max-w-full max-md:text-4xl">
            Welcome to Zemenay ተከራይ
          </h1>
          <p className="text-xl font-medium leading-8 max-md:max-w-full">
            <br />
            Your Gateway to Unique and Affordable Stays
            <br />
            Discover incredible homes and unforgettable experiences around the
            world.
          </p>
        </div>
      </div>

      <SearchForm />

      <div className="mt-24 w-[80%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {properties.map((property, index) => (
            <PropertyCard
              key={property._id}
              {...property}
              onFavoritesClick={() => handleFavoritesClick(property._id)}
            />
          ))}
        </div>
      </div>

      {/* Footer section */}
      <div className="flex flex-col justify-center items-center self-stretch px-16 py-24 mt-5 bg-gray-50 max-md:px-5 max-md:max-w-full">
        <Footer />
      </div>
    </div>
  );
};
