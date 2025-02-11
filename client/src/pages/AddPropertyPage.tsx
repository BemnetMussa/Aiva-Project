import React, { useState } from "react";
import axios from "axios";

const AddPropertyPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<number | "">("");

  // Handle form submission to send both property details and image
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    // Prepare FormData to send both text and file data together
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price.toString());
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("squareFeet", squareFeet);
    formData.append("description", description);
    formData.append("phoneNumber", phoneNumber.toString());
    formData.append("type", type);
    formData.append("status", status);

    console.log(formData);
    try {
      const response = await fetch("http://localhost:5000/api/properties/add", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status === 200) {
        console.log("Property and image added successfully");
      } else {
        console.error("Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg w-[20%]">
        <h1>Add Property</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-2 justify-center h-full "
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="text"
            placeholder="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="text"
            placeholder="Bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="text"
            placeholder="Square Feet"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
            className="rounded-xl border border-gray-300 ml-4 px-4 py-2"
          />

          {/* Image File Input */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="ml-4"
          />

          <button
            type="submit"
            className="bg-primary-color text-white ml-4 w-full rounded-xl px-4 py-2"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
