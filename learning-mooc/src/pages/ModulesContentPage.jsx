import moduleResources from "./moduleContentLinks";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

export default function ModulesContentPage({ darkMode }) {
  const { trackId, semesterId, moduleId } = useParams();
  const decodedModuleId = decodeURIComponent(moduleId);
  const navigate = useNavigate();

  const semesterModules = moduleResources?.[trackId]?.[semesterId];
  const content = semesterModules?.[decodedModuleId];

  if (!content) {
    return (
      <div className="p-6 min-h-screen dark:bg-[#101828] bg-white transition-colors duration-300 text-center">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
          {decodedModuleId}
        </h1>
        <p className="text-red-600 font-bold dark:text-red-400">
          No content found for this module.
        </p>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 md:px-8 pt-6 pb-2 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className={`text-sm font-medium hover:underline ${darkMode ? "text-white" : "text-black"}`}
        >
          ⬅ Back
        </button>
        <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
          {decodedModuleId} — {semesterId} / {trackId}
        </h1>
      </div>

      <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PDF */}
        <div className={`rounded-xl p-4 shadow-lg transition ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-300">Course PDF</h2>
          {content.pdf ? (
            <a
              href={content.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              📅 Download Course PDF
            </a>
          ) : (
            <p className="text-red-500">No course PDF available.</p>
          )}
        </div>

        {/* Series */}
        <div className={`rounded-xl p-4 shadow-lg transition ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
          <h2 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-300">Exercise Series</h2>
          {content.series?.length ? (
            <ul className="list-disc list-inside space-y-1">
              {content.series.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sm text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400"
                  >
                    📘 Series {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No exercise series available.</p>
          )}
        </div>

        {/* Exams */}
        <div className={`rounded-xl p-4 shadow-lg transition ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
          <h2 className="text-xl font-bold mb-3 text-red-600 dark:text-red-300">Exam Sheets</h2>
          {content.exams?.length ? (
            <ul className="list-disc list-inside space-y-1">
              {content.exams.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sm text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400"
                  >
                    🗒️ Exam {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No exam PDFs available.</p>
          )}
        </div>

        {/* YouTube Link */}
        <div className={`rounded-xl p-4 shadow-lg transition ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
          <h2 className="text-xl font-bold mb-3 text-green-600 dark:text-green-300">YouTube Resource</h2>
          {content.youtube ? (
            <a
              href={content.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-4 py-2 rounded transition"
            >
              ▶️ Watch on YouTube
            </a>
          ) : (
            <p className="text-red-500">No video available for this module.</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
