import React from "react";
import { Link } from "react-router-dom";

export default function TrackCard({ name, image, url, darkMode }) {
  const borderColor = darkMode ? "border-white" : "border-black";

  return (
    <Link
      to={url}
      className="w-full md:w-[45%] lg:w-[30%] no-underline"
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl border-2 ${borderColor} shadow-md hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden`}
      >
        <img
          src={image}
          alt={name}
          className={`w-full h-40 object-cover border-b-2 ${borderColor}`}
        />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore the {name} track.
          </p>
        </div>
      </div>
    </Link>
  );
}
