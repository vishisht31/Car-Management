import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CarForm from "../components/CarForm";
import { useAuth } from "../context/AuthContext";
import ApiClient from "../services/apiClient";
import SportsCar from "../assets/sports-car-for-sale.png";

export default function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const { token } = useAuth();
  const APICLIENT = new ApiClient();

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

  const handleSubmit = async (carData) => {
    // Here you would typically send a PUT request to your API
    // For this example, we'll just simulate an API call
    // console.log("Updating car:", { id, ...carData });
    // Redirect to home page after updating
    try {
      let res = await APICLIENT.editCar(id, carData, token);
      console.log(res);
      // setCar(res);
    } catch (err) {
      console.log("error while updating car details", err);
      throw err;
    }
    navigate("/");
  };

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

  if (!car) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Edit Car
      </h1>
      <CarForm onSubmit={handleSubmit} initialData={car} />
      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
        >
          Delete Car
        </button>
      </div>
    </div>
  );
}
