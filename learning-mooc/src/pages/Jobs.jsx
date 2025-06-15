import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";



export default function Jobs({ darkMode }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch remote tech-oriented jobs
    fetch("https://www.arbeitnow.com/api/job-board-api?remote=true")
      .then(res => res.json())
      .then(json => {
        const allJobs = json.data || [];
        // Filter tech-related by looking for keywords in title/location
        const techJobs = allJobs.filter(job =>
          /developer|engineer|tech|software|remote/i.test(job.title)
        ).slice(0, 10); // Show top 10
        setJobs(techJobs);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <PageWrapper>

    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#101828] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-4xl font-bold text-center mb-6">
        Tech Job Opportunities
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading job listings...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, idx) => (
            <a
              key={idx}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                <p className="text-sm mb-2">{job.company}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{job.location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Posted: {new Date(job.created_at).toLocaleDateString()}
                </p>
                {job.remote && (
                  <span className="inline-block px-2 py-1 text-xs bg-purple-500 text-white rounded">
                    Remote
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-sm">
        Data source:{" "}
        <a
          href="https://www.arbeitnow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          Arbeitnow API
        </a>
      </p>
    </div>
    </PageWrapper>
  );
}
