// import Link from "next/link";
// import Image from "Image";
import { Link, useNavigate } from "react-router-dom";
import SportsCar  from "../assets/sports-car-for-sale.png";

export default function CarCard({ car }) {
  const navigate = useNavigate()
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <div onClick={()=>{navigate(`/cars/${car._id}`)}} className="relative h-48">
        <img
        
          src={SportsCar}
          alt={`${car.title}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">
          {car.title}
        </h3>
        <p className="text-gray-400">
          {car.description}
        </p>
        {/* <p className="text-white font-medium mt-2">
          ${car.price.toLocaleString()}
        </p> */}
      </div>
      <div className="bg-gray-900 px-4 py-3 mt-2">
        <Link
          to={`/cars/edit/${car._id}`}
          className="block w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-center font-medium rounded-md transition duration-150 ease-in-out"
        >
          Edit Car
        </Link>
      </div>
    </div>
  );
}
