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
      try {
        const response = await fetch("http://localhost:5000/api/properties/fetchProperty", {
          method: "GET",
          credentials: "include",
        });
        console.log(response.json);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);


  return (
    <div className="flex relative overflow-hidden flex-col items-center h-full w-full pt-14 bg-[#f3f3f3] border border-cyan-400 border-solid shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      {/* Navbar section */}
      <Navbar />

      <div className="items-start p-8 absolute left-12 top-24">
        <h2 className="border-b-4 border-black font-bold">Hosted Bookings</h2>
      </div>

      <div className="p-20 flex items-center justify-center">
        <div className="mt-24 mx-auto sm:w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-1">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                {...property}
                
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
