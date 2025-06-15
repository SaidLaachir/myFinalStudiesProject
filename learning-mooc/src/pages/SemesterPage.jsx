import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

const SemesterPage = ({ darkMode }) => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const semesters = ["S1", "S2", "S3", "S4", "S5", "S6"];

  const trackImageMap = {
    SMI: "ComputerTrack.png",
    SMA: "MathTrack.jpg",
    SMP: "PhysicTrack.jpg",
    SVTU: "BiologyTrack.jpg",
  };

  const colors = [
    "bg-white text-black",
    "bg-yellow-200 text-black",
    "bg-orange-300 text-black",
    "bg-green-400 text-white",
    "bg-purple-500 text-white",
    "bg-blue-500 text-white",
  ];

  const trackImage = `/univ-pics/${trackImageMap[trackId.toUpperCase()] || "default.jpg"}`;
  const borderColor = darkMode ? "border-white" : "border-black";

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className={`mb-4 text-sm font-medium px-3 py-1 rounded transition ${
            darkMode
              ? "bg-white text-black hover:bg-gray-300"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          ← Back
        </button>
        <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-black"}`}>
          Track: {trackId.toUpperCase()} - Choose a Semester
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {semesters.map((semester, index) => (
            <Link
              key={semester}
              to={`/tracks/${trackId}/${semester}`}
              className="w-full no-underline"
            >
              <div className={`rounded-xl ${borderColor} border-2 shadow-md hover:shadow-xl overflow-hidden transition-transform transform hover:scale-105 ${colors[index % colors.length]}`}>
                <img
                  src={trackImage}
                  alt={trackId}
                  className={`w-full h-28 object-cover border-b-2 ${borderColor}`}
                />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold">{semester}</h2>
                  <p className="text-sm">Explore the {semester} content</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default SemesterPage;
