import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moduleResources from "./modulesResources";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

export default function ModulesPage({ darkMode }) {
  const { trackId, semesterId } = useParams();
  const navigate = useNavigate();
  const modules = Object.keys(moduleResources?.[trackId]?.[semesterId] || []);

  return (
    <PageWrapper>
      <div className="px-4 md:px-8 pt-6 pb-2">
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
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-blue-700"}`}>
          {trackId} – {semesterId}
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {modules.map((mod, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl overflow-hidden border transition-all duration-300 w-72 cursor-pointer shadow-md hover:shadow-xl ${
              darkMode
                ? "bg-gray-900 text-white border-white/40"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            <Link to={`/tracks/${trackId}/${semesterId}/${encodeURIComponent(mod)}`}>
              <div className="bg-gradient-to-r from-[#0000FF] to-[#5CD5E8] p-3">
                <div className="bg-white text-blue-700 text-sm font-semibold rounded px-3 py-1 w-fit mx-auto shadow-sm">
                  {trackId} / {semesterId} / {mod}
                </div>
              </div>

              <div className="p-5 text-center text-lg font-semibold">
                {mod}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}
