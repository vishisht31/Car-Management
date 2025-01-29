import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SportsCar from "../assets/sports-car-for-sale.png";

import ApiClient from "../services/apiClient";
// import type { Car } from "../types"

export default function SingleCarPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const { token } = useAuth();
    const APICLIENT = new ApiClient();
    const navigate = useNavigate()

  const getCarDetails = async (id, token) => {
    try {
      let res = await APICLIENT.getCarDetails(id, token);
      console.log(res);
      setCar(res);
    } catch (err) {
      console.log("error while getting car details", err);
      throw err;
    }
  };
  useEffect(() => {
    getCarDetails(id, token);
  }, [id, token]);

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      // Here you would typically send a DELETE request to your API
      // For this example, we'll just simulate an API call
      // console.log("Deleting car:", id);
      try {
        let res = await APICLIENT.deleteCar(id, token);
        console.log(res);
      } catch (err) {
        console.log("error while deleting", err);
        throw err;
      }
      // Redirect to home page after deleting
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {car.title}
        </h1>
        <div className="space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Delete Car
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-150 ease-in-out"
          >
            Back to List
          </Link>
          <Link
            to={`/cars/${car._id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Edit Car
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={SportsCar}
              alt={`${car.title}`}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {car.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={SportsCar}
                  alt={`${car.make} ${car.model} - View ${index + 2}`}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-300">{car.description}</p>
        </div>
      </div>
    </div>
  );
}
