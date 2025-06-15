import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function LanguagePreferences({ darkMode }) {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-[#101828] text-white" : "bg-white text-gray-900"}`}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium mb-6 gap-2 hover:underline"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Language Preferences</h1>
      <p className="mb-2">Choose your preferred language:</p>

      <ul className="space-y-2">
        {["English", "French", "Arabic"].map((lang, index) => (
          <li
            key={index}
            className={`px-4 py-2 rounded-xl cursor-pointer transition ${
              darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {lang}
          </li>
        ))}
      </ul>
    </div>
  );
}
