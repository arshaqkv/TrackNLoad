import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
      <p className="text-gray-600 mt-2">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
