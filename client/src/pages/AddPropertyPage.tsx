import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUploaderDragAndDrop";
import { X } from "lucide-react";

interface AddPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyPage: React.FC<AddPropertyFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<number | "">("");

  // Handle form submission to send both property details and image
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    // Prepare FormData to send both text and file data together
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("address", address);
    formData.append("city", city);
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

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]); // Store the first selected file
    }
  };

  const handleCloseModule = (e: React.FormEvent) => {
    const target = e.target as HTMLElement;

    if (target.getAttribute("data-name") === "ModuleBackground") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        data-name="ModuleBackground"
        className="fixed flex justify-center z-50 w-full insert-0 overflow-hidden bg-[#f3f3f3] h-full  "
        onClick={(e) => {
          handleCloseModule(e);
        }}
      >
        <div className="w-full sm:mx-10 xl:mx-0 xl:w-8/12 bg-white rounded-xl shadow-xl my-6">
          <div className="relative flex flex-col items-center gap-10 px-4 py-6 w-full ">
            {/* close module button */}
            <div className="p-5 absolute right-2 top-0">
              <X size={20} onClick={onClose} />
            </div>

            <h1 className="pt-10 text-4xl font-semibold  text-cyan-500">
              Host Your Property
            </h1>

            {/* user inputs */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 items-center justify-center h-full w-full "
            >
              <div className="grid md:grid-cols-3  gap-5 px-5 w-full ">
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  <h2>
                    Property Name <span className="text-red-700">*</span>
                  </h2>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  <h2>
                    Address <span className="text-red-700">*</span>
                  </h2>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  <h2>
                    City <span className="text-red-700">*</span>
                  </h2> 
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  Price
                  <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  Bedrooms
                  <input
                    type="text"
                    placeholder="Bedrooms"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]   "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  Bathrooms
                  <input
                    type="text"
                    placeholder="Bathrooms"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  Square Feet
                  <input
                    type="text"
                    placeholder="Square Feet"
                    value={squareFeet}
                    onChange={(e) => setSquareFeet(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  <h2>
                    Type <span className="text-red-700">*</span>
                  </h2>
                  <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  Status
                  <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
                <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md ">
                  <h2>
                    Phone Number <span className="text-red-700">*</span>
                  </h2>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
                    className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-[0.8rem]  "
                  />
                </label>
              </div>

              <div className="flex flex-col space-y-4 w-full p-6">
                <label
                  htmlFor="description"
                  className="font-semibold text-xl sm:text-lg md:text-md "
                >
                  Property Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a detailed description of your property..."
                  className="p-4 h-40 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                <small className="text-gray-500">Max 500 characters</small>
              </div>
              <div className="p-4 max-w-lg mx-auto mb-6">
                <h2 className="text-lg font-semibold mb-4">Upload an Image</h2>
                <ImageUpload onFileSelect={handleFileSelect} />

                {selectedFile && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Selected file: {selectedFile.name}
                    </p>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="mt-2 w-full h-auto rounded-lg shadow"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-cyan-500 text-white text-sm px-6 py-3 font-medium rounded-sm min-w-6/12 max-w-7/12 hover:bg-cyan-600 cursor-pointer"
              >
                Add New Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPropertyPage;
