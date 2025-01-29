import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { logout, isAuthorized } = useAuth();
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-1.5">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 21v-8H7v8M7 3v5h8"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">AutoVault</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthorized() && (
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
              >
                Logout
              </button>
            )}
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
