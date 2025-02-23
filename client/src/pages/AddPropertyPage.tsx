import React, { useState, FormEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import ImageUpload from "../components/ImageUploaderDragAndDrop";

interface AddPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PropertyFormData {
  title: string;
  address: string;
  city: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  description: string;
  type: string;
  status: string;
  phoneNumber: string;
}

const AddPropertyPage: React.FC<AddPropertyFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    address: "",
    city: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    description: "",
    type: "",
    status: "",
    phoneNumber: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", selectedFile);

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5000/api/properties/add", {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Property added successfully");
        onClose();
      } else {
        console.error("Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // for the modal 
  if (!isOpen) return null;

  // function for the inputs
  const renderFormField = (
    label: string,
    name: keyof PropertyFormData,
    required?: boolean
  ) => (
    <label className="flex flex-col gap-3 font-semibold text-xl sm:text-lg md:text-md">
      <h2>
        {label} {required && <span className="text-red-700">*</span>}
      </h2>
      <input
        type="text"
        name={name}
        placeholder={label}
        value={formData[name]}
        onChange={handleInputChange}
        className="rounded-sm border border-gray-300 p-2 w-full bg-gray-50 text-sm"
      />
    </label>
  );

  return (
    <div
      className="fixed inset-0 flex justify-center items-start z-50 w-full bg-[#f3f3f3] overflow-y-auto p-6"
      onClick={handleBackgroundClick}
    >
      <div className="w-full sm:mx-10 xl:mx-0 xl:w-8/12 bg-white rounded-xl shadow-xl">
        <div className="relative w-full px-6 pt-6 pb-8">
          <button
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl font-semibold text-cyan-500">
              Host Your Property
            </h1>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-8"
            >
              <div className="grid md:grid-cols-3 gap-5">
                {renderFormField("Property Name", "title", true)}
                {renderFormField("Address", "address", true)}
                {renderFormField("City", "city", true)}
                {renderFormField("Price", "price")}
                {renderFormField("Bedrooms", "bedrooms")}
                {renderFormField("Bathrooms", "bathrooms")}
                {renderFormField("Square Feet", "squareFeet")}
                {renderFormField("Type", "type", true)}
                {renderFormField("Status", "status")}
                {renderFormField("Phone Number", "phoneNumber", true)}
              </div>

              <div className="flex flex-col space-y-4">
                <label className="font-semibold text-xl sm:text-lg md:text-md">
                  Property Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a detailed description of your property..."
                  className="p-4 h-40 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <small className="text-gray-500">Max 500 characters</small>
              </div>

              <div className="w-full max-w-lg mx-auto">
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

              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white text-sm px-6 py-3 font-medium rounded-sm 
                           w-full max-w-md hover:bg-cyan-600 transition-colors"
                >
                  Add New Property
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
