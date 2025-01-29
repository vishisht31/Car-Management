

export default function EmptyState({ onAddCar }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in-50">
      <div className="rounded-full bg-gray-800/50 p-4 mb-8 ring-4 ring-gray-800/25">
        <svg
          className="h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-100 mb-3">
        Your garage is empty
      </h3>
      <p className="text-gray-400 text-center max-w-sm mb-8">
        Start building your collection by adding your first vehicle to the
        garage.
      </p>
      <button
        onClick={()=>{onAddCar(true)}}
        className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Your First Car
      </button>
    </div>
  );
}
