import { useState, useEffect } from "react";
// import { input } from "@/components/ui/input"
// import { button } from "@/components/ui/button"
// import { label } from "@/components/ui/label"
import FileUpload from "./FileUpload";

export default function CarForm({ onSubmit, isSubmitting, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    images: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  const handleFileSelect = (files) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 10),
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-300 mb-1"
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
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
