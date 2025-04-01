import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X, Upload, Loader2 } from "lucide-react";

interface PropertyData {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  phoneNumber: string;
  type: string;
  status: string;
  image?: string;
}

interface PropertyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  onSuccess: () => void;
}

const PropertyEditModal: React.FC<PropertyEditModalProps> = ({
  isOpen,
  onClose,
  propertyId,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<PropertyData>({
    _id: "",
    title: "",
    location: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    description: "",
    phoneNumber: "",
    type: "For Rent",
    status: "Available",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  // Fetch property data
  useEffect(() => {
    const fetchPropertyData = async (propertyId: string) => {
      try {
        setLoading(true);
        console.log("propertyId", propertyId);
        const response = await fetch(
          `http://localhost:5000/api/properties/${propertyId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch property data");
        }

        const data = await response.json();
        setFormData(data);
        console.log("data ", data);
        setImagePreview(data.image);
      } catch (err) {
        setError("Failed to load property data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && propertyId) {
      fetchPropertyData(propertyId);
    }
  }, [isOpen, propertyId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

  const handleSubmit = async (e: FormEvent, propertyId: string) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");


    try {
      console.log("handleSubmit", propertyId);
      // Create FormData object to handle file upload
      const submitData = new FormData();

      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "image" && key !== "_id") {
          submitData.append(key, String(value));
        }
      });

      // Add image file if one was selected
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const response = await fetch(
        `http://localhost:5000/api/properties/edit/${propertyId}`,
        {
          method: "PUT",
          credentials: "include",
          body: submitData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update property");
      }

      setSuccess("Property updated successfully!");

      // Call onSuccess callback and close modal after short delay
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError("Failed to update property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-8 pb-8 z-50 overflow-y-auto"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Edit Property</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="ml-2">Loading property data...</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => handleSubmit(e, propertyId)}
              id="edit-property-form"
            >
              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                  {success}
                </div>
              )}

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Image
                </label>
                <div className="flex items-center gap-6">
                  {/* Current image preview */}
                  <div className="w-40 h-40 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Property preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  {/* File input */}
                  <div className="flex-1">
                    <label className="block w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg cursor-pointer text-center hover:bg-blue-100 transition">
                      <span>Choose new image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      Upload a new image to replace the current one.
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Fields - first row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Text Fields - second row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($ per month)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>

              {/* Text Fields - third row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    name="squareFeet"
                    value={formData.squareFeet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="For Rent">For Rent</option>
                    <option value="For Sale">For Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>

              {/* Phone number */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  required
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-property-form"
            disabled={submitting || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-400"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyEditModal;
