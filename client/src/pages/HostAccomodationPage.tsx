import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import HostPropertyCard from "../components/HostPropertyCard";
import { Plus } from "lucide-react";
import AddPropertyForm from "./AddPropertyPage";


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
  const [isAddingProperty, setIsAddingProperty] = useState(false);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/fetchProperty",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddingProperty = () => {
    setIsAddingProperty(true);
  };

  return (
    <div className="flex overflow-hidden flex-col items-center w-full pt-14 bg-[#f3f3f3] h-[100vh]">
      {/* Navbar section */}
      <Navbar />

      <div className="items-start p-8 absolute left-12 top-24">
        <h2 className="border-b-4 border-black font-bold">Hosted Bookings</h2>
      </div>

      <div className="p-20 flex items-center justify-center">
        <div className="mt-24 mx-auto sm:w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-1">
            {properties.map((property) => (
              <HostPropertyCard key={property._id} {...property} />
            ))}
          </div>
        </div>
      </div>

      {/* Show the Add Property Form when clicked */}
      {isAddingProperty && (
        <AddPropertyForm
          isOpen={isAddingProperty}
          onClose={() => setIsAddingProperty(false)}
        />
      )}

      {/* Conditionally render the Post Property Button based on the modal*/}

      {!isAddingProperty && (
        <button
          className="fixed top-24 right-8 px-4 py-2 flex items-center gap-2
          bg-blue-500 hover:bg-blue-700 text-white font-medium
          rounded-md shadow-md transition-all duration-200 ease-in-out
          hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleAddingProperty}
        >
          <Plus size={18} strokeWidth={2} />
          <span>Post Property</span>
        </button>
      )}
    </div>
  );
};
