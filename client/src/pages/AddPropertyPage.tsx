import React, { useState, FormEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import ImageUpload from "../components/ImageUploaderDragAndDrop";

interface AddPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertyAdded: () => void;
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
  onPropertyAdded,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedFile) {
      alert("Please upload an image for your property");
      setIsSubmitting(false);
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
        onPropertyAdded();
        onClose();
      } else {
        console.error("Failed to add property");
        alert("Failed to add property. Please try again.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
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

  const handleClearImage = () => {
    setSelectedFile(null);
  };

  // for the modal
  if (!isOpen) return null;

  // function for the inputs
  const renderFormField = (
    label: string,
    name: keyof PropertyFormData,
    required?: boolean,
    type: string = "text"
  ) => (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-base text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={formData[name]}
        onChange={handleInputChange}
        className="rounded-md border border-gray-300 p-2.5 w-full bg-gray-50 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
      />
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-8 pb-8 z-50 overflow-y-auto"
      onClick={handleBackgroundClick}
    >
      <div className="w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl">
        <div className="relative w-full p-6">
          <button
            className="absolute right-5 top-5 p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-semibold text-cyan-600">
              Host Your Property
            </h1>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                {renderFormField("Property Name", "title", true)}
                {renderFormField("Address", "address", true)}
                {renderFormField("City", "city", true)}
                {renderFormField("Price", "price", false, "number")}
                {renderFormField("Bedrooms", "bedrooms", false, "number")}
                {renderFormField("Bathrooms", "bathrooms", false, "number")}
                {renderFormField("Square Feet", "squareFeet", false, "number")}

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-base text-gray-700">
                    Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange as any}
                    className="rounded-md border border-gray-300 p-2.5 w-full bg-gray-50 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Select property type</option>
                    <option value="Sell">For Sell</option>
                    <option value="Rent">For Rent</option>
                  
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-base text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange as any}
                    className="rounded-md border border-gray-300 p-2.5 w-full bg-gray-50 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="">Select status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
    
                  </select>
                </div>

                {renderFormField("Phone Number", "phoneNumber", true)}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-base text-gray-700">
                  Property Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a detailed description of your property..."
                  className="p-3 h-32 rounded-md border border-gray-300 bg-gray-50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm resize-none"
                />
                <div className="flex justify-between items-center">
                  <small className="text-gray-500">Max 500 characters</small>
                  <small className="text-gray-500">
                    {formData.description.length}/500
                  </small>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="w-full">
                  <h2 className="text-base font-semibold text-gray-700 mb-3">
                    Upload Property Image{" "}
                    <span className="text-red-600">*</span>
                  </h2>
                  <ImageUpload onFileSelect={handleFileSelect} />
                </div>

                {selectedFile ? (
                  <div className="w-full flex flex-col">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Property Preview"
                        className="w-full h-60 object-cover rounded-md shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        aria-label="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 truncate">
                      {selectedFile.name} (
                      {Math.round(selectedFile.size / 1024)} KB)
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-60 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-400 text-sm">
                      Image preview will appear here
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center w-full mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-500 text-white px-6 py-3 font-medium rounded-md 
                           w-full max-w-md hover:bg-cyan-600 transition-colors disabled:bg-cyan-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding Property..." : "Add New Property"}
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
