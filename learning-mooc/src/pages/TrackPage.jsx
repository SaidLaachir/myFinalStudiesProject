import React from "react";
import TrackCard from "../WebPage/TrackCard";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";


const trackList = [
  {
    name: "SMI",
    image: "/univ-pics/ComputerTrack.png",
    path: "/tracks/SMI",
  },
  {
    name: "SMA",
    image: "/univ-pics/MathTrack.jpg",
    path: "/tracks/SMA",
  },
  {
    name: "SMP",
    image: "/univ-pics/PhysicTrack.jpg",
    path: "/tracks/SMP",
  },
  {
    name: "SVTU",
    image: "/univ-pics/BiologyTrack.jpg",
    path: "/tracks/SVTU",
  },
];

export default function TrackPage({ darkMode }) {
  return (
    <PageWrapper>

    <div className="p-6 min-h-screen">
      <h1 className={`text-4xl font-bold text-center mb-8 ${darkMode ? "text-white" : "text-black"}`}>
        Academic Tracks
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {trackList.map((track, index) => (
          <TrackCard
            key={index}
            name={track.name}
            image={track.image}
            url={track.path}
            darkMode={darkMode} 
          />
        ))}
      </div>
    </div>
    </PageWrapper>
  );
}
