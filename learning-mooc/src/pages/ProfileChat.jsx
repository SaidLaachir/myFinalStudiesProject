// src/pages/ProfileChat.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

const semesterColors = {
  S1: "border-white",
  S2: "border-yellow-400",
  S3: "border-orange-400",
  S4: "border-green-500",
  S5: "border-purple-600",
  S6: "border-blue-500",
};

const ProfileChat = ({ darkMode }) => {
  const { uid } = useParams(); // FIXED
  const navigate = useNavigate(); // 👈 added for back navigation
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [uid]);

  if (!profile) {
    return (
      <div className={`text-center py-10 ${darkMode ? "text-white" : "text-black"}`}>
        Loading profile...
      </div>
    );
  }

  const {
    firstName = "N/A",
    lastName = "N/A",
    email = "N/A",
    track = "N/A",
    semester = "S1",
    bio = "No bio available.",
  } = profile;

  return (
    <PageWrapper>
      <div
        className={`max-w-xl mx-auto px-4 py-8 rounded-xl shadow-xl transition-all duration-300
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
      >
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-blue-500 hover:underline"
        >
          ← Back
        </button>

        <div className="flex flex-col items-center gap-4">
          <FaUserCircle
            size={80}
            className={`rounded-full border-4 ${semesterColors[semester] || "border-gray-400"}`}
          />
          <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-400">{email}</p>
        </div>

        <div className="mt-6 space-y-2 text-base">
          <p><strong>Track:</strong> {track}</p>
          <p><strong>Semester:</strong> {semester}</p>
          <p><strong>Bio:</strong> {bio}</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfileChat;
