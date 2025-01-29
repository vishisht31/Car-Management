import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";
import AddCarModal from "../components/AddCarModal";
import { useAuth } from "../context/AuthContext";
import ApiClient from "../services/apiClient";
import EmptyState from "../components/EmptyState";

// Dummy data
const initialCars = [
  {
    id: "1",
    make: "Tesla",
    model: "Model S",
    year: 2022,
    color: "Red",
    price: 94990,
    images: ["/placeholder.svg?height=400&width=600"],
  },
  {
    id: "2",
    make: "BMW",
    model: "M3",
    year: 2023,
    color: "Blue",
    price: 84100,
    images: ["/placeholder.svg?height=400&width=600"],
  },
  {
    id: "3",
    make: "Audi",
    model: "RS6 Avant",
    year: 2022,
    color: "Gray",
    price: 116500,
    images: ["/placeholder.svg?height=400&width=600"],
  },
  {
    id: "4",
    make: "Audi",
    model: "RS6 Avant",
    year: 2022,
    color: "Gray",
    price: 116500,
    images: ["/placeholder.svg?height=400&width=600"],
  },
  {
    id: "5",
    make: "Audi",
    model: "RS6 Avant",
    year: 2022,
    color: "Gray",
    price: 116500,
    images: ["/placeholder.svg?height=400&width=600"],
  },
];

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const { token } = useAuth();
  const APICLIENT = new ApiClient();

  const filterCars = () => {
    const filCars = cars.filter(
      (car) =>
        car.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        car.description?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredCars(filCars);
  };

  useEffect(() => {
    filterCars();
  }, [searchTerm]);
  const handleAddCar = async (newCar) => {
    // const carWithId = { ...newCar, id: Date.now().toString() };
    console.log(newCar);
    try {
      let res = await APICLIENT.createCar(newCar, token);
      console.log(res);
      getCarsOfUser();
    } catch (err) {
      console.log("err while asaving car", err);
      throw err;
    }
    // setCars((prevCars) => [...prevCars, carWithId]);
    setIsAddCarModalOpen(false);
  };

  const getCarsOfUser = async () => {
    try {
      let res = await APICLIENT.getCarsOfUser(token);
      console.log(res);
      setCars(res);
    } catch (err) {
      console.log("error while fetching user's car", err);
      throw err;
    }
  };

  useEffect(() => {
    getCarsOfUser();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          Your Garage
        </h1>
        <p className="text-gray-400">
          Manage your vehicle collection in one place
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cars..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Quick Actions</h3>
            <button
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-md transition duration-150 ease-in-out flex items-center justify-center"
              onClick={() => setIsAddCarModalOpen(true)}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Car
            </button>
          </div>
        </div>

        {cars.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {searchTerm === ""
              ? cars.map((car) => <CarCard key={car.id} car={car} />)
              : filteredCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <EmptyState onAddCar={setIsAddCarModalOpen} />
        )}
      </div>

      <AddCarModal
        isOpen={isAddCarModalOpen}
        onClose={() => setIsAddCarModalOpen(false)}
        onAddCar={handleAddCar}
      />
    </div>
  );
}
