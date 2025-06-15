import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

export default function Profile({ darkMode }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    track: "",
    semester: "",
    bio: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempTrack, setTempTrack] = useState("");
  const [tempSemester, setTempSemester] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const trackOptions = ["SMI", "SMA", "SMP", "SVTU"];

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return navigate("/login");

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: user.email,
          track: data.track || "",
          semester: data.semester || "",
          bio: data.bio || "",
        });
        setTempTrack(data.track || "");
        setTempSemester(data.semester || "");
        setTempBio(data.bio || "");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, "users", user.uid), {
        track: tempTrack,
        semester: tempSemester,
        bio: tempBio,
      });

      setUserData((prev) => ({
        ...prev,
        track: tempTrack,
        semester: tempSemester,
        bio: tempBio,
      }));

      setEditMode(false);
      setConfirmation("✅ Profile updated successfully!");
      setTimeout(() => setConfirmation(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const beltColors = {
    S1: "bg-white text-black",
    S2: "bg-yellow-400 text-white",
    S3: "bg-orange-500 text-white",
    S4: "bg-green-500 text-white",
    S5: "bg-purple-600 text-white",
    S6: "bg-blue-600 text-white",
  };

  const semesterBorderColors = {
    S1: "border-white",
    S2: "border-yellow-400",
    S3: "border-orange-400",
    S4: "border-green-500",
    S5: "border-purple-600",
    S6: "border-blue-500",
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <div
          className={`p-8 rounded-xl shadow-lg w-full max-w-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {/* 🔙 Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-sm text-blue-500 hover:underline"
          >
            ← Back
          </button>

          {/* ✅ Confirmation Message */}
          {confirmation && (
            <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md text-center border border-green-300">
              {confirmation}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border-4 flex items-center justify-center
            ${semesterBorderColors[userData.semester] || "border-gray-300"}
            ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
            >
              <FaUserCircle className="w-full h-full text-gray-400 dark:text-gray-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

          <div className="space-y-4">
            <input
              value={userData.firstName}
              disabled
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
              }`}
            />
            <input
              value={userData.lastName}
              disabled
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
              }`}
            />
            <input
              value={userData.email}
              disabled
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
              }`}
            />

            {/* Track Dropdown */}
            <div>
              <label className="block mb-2">Track</label>
              {editMode ? (
                <select
                  value={tempTrack}
                  onChange={(e) => setTempTrack(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                >
                  <option value="">Select Track</option>
                  {trackOptions.map((track) => (
                    <option key={track} value={track}>
                      {track}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={userData.track}
                  disabled
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-gray-100 border-gray-300 text-black"
                  }`}
                />
              )}
            </div>

            {/* Semester */}
            <div>
              <label className="block mb-2">Semester</label>
              {editMode ? (
                <div className="flex gap-2 flex-wrap">
                  {["S1", "S2", "S3", "S4", "S5", "S6"].map((sem) => (
                    <label
                      key={sem}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="semester"
                        value={sem}
                        checked={tempSemester === sem}
                        onChange={() => setTempSemester(sem)}
                      />
                      <span
                        className={`px-3 py-1 rounded-full text-sm border-2 border-black ${beltColors[sem]}`}
                      >
                        {sem}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  value={userData.semester}
                  disabled
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-gray-100 border-gray-300 text-black"
                  }`}
                />
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block mb-2">Bio</label>
              {editMode ? (
                <textarea
                  maxLength={200}
                  rows={4}
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border resize-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Write something about yourself..."
                />
              ) : (
                <textarea
                  value={userData.bio}
                  disabled
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border resize-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-gray-100 border-gray-300 text-black"
                  }`}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setTempTrack(userData.track);
                    setTempSemester(userData.semester);
                    setTempBio(userData.bio);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
