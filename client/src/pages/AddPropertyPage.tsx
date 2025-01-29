import React, { useState } from "react";

const AddPropertyPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number>();
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/users/property/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          location,
          price,
          bedrooms,
          bathrooms,
          squareFeet,
          description,
          type,
          status,
        }),
        credentials: "include", // This is required for cookies to work
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg">
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
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Square Feet"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-gray-300 ml-4"
          />
          <button type="submit">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
