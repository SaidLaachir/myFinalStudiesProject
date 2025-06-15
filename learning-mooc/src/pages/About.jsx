import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function About({ darkMode }) {
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

      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p>
        This MOOC platform is proudly developed by the 2025 PFE last Promotion student Said LAACHIR under the guidance of Mr. Fakhri
        at the Faculty of Sciences, Ibn Tofail University.
      </p>
    </div>
  );
}
