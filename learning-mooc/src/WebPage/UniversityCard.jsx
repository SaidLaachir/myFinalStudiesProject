import React from "react";

export default function UniversityCard({ name, image, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full md:w-[45%] lg:w-[30%] no-underline"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">Click to explore {name}’s website.</p>
        </div>
      </div>
    </a>
  );
}
