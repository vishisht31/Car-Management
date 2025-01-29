import { useState } from "react";
import FileUpload from "./FileUpload";
export default function AddCarModal({ isOpen, onClose, onAddCar }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileSelect = (files) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 10),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onAddCar(formData);
    setFormData({
      title: "",
      description: "",
      tags: [],
      images: [],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Add New Car
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags.join(",")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value.split(","),
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Images
            </label>
            <FileUpload onFileSelect={handleFileSelect} multiple />
          </div>
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Uploaded ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Images (comma-separated URLs)
            </label>
            <input
              id="images"
              name="images"
              type="text"
              value={formData.images.join(",")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  images: e.target.value.split(",").slice(0, 10),
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-md transition duration-150 ease-in-out"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
}
