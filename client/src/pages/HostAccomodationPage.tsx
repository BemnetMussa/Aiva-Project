import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
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

export const HostAccommodation: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      console.log("hello form the frontend fetch proeprties");
      try {
        const response = await fetch(
          "http://localhost:5000/api/properties/fetchProperty",
          {
            method: "GET",
            credentials: "include",
          }
        );
        console.log(response);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex relative overflow-hidden flex-col items-center h-[100vh] w-full pt-14 bg-[#f8f9fa] border border-cyan-400 border-solid shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      {/* Navbar section */}
      <Navbar />

      <div className="items-start p-8 absolute left-12 top-24">
        <h2 className="border-b-4 border-black font-bold">Current Bookings</h2>
      </div>

      <div className="mt-36 w-[80%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {properties.map((property, index) => (
            <div key={index} className=" ">
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
