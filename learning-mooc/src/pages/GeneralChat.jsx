import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const semesterColors = {
  S1: "border-white",
  S2: "border-yellow-400",
  S3: "border-orange-400",
  S4: "border-green-500",
  S5: "border-purple-600",
  S6: "border-blue-500",
};

export default function GeneralChat({ darkMode }) {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "generalChat"),
      orderBy("timestamp", "asc"),
      limit(100)
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const trimmedMessages = newMessages.slice(-100);
      setMessages(trimmedMessages);
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : {};

    await addDoc(collection(db, "generalChat"), {
      text: input,
      timestamp: new Date(),
      uid: user.uid,
      displayName:
        userData.firstName + " " + userData.lastName || "Anonymous",
      semester: userData.semester || "S1",
      email: user.email,
    });

    setInput("");
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageWrapper>

    <div className={`min-h-screen px-4 py-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <h1 className={`text-3xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-black"}`}>
        General Chat
      </h1>

      <div className="max-w-4xl mx-auto">
        <div
          className={`rounded-lg p-4 h-[70vh] overflow-y-auto space-y-4 shadow-lg border
          ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
        >
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <button
                onClick={() => navigate(`/profile-chat/${msg.uid}`)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center 
                  ${semesterColors[msg.semester] || "border-gray-400"}
                  ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
              >
                <FaUserCircle size={24} />
              </button>
              <div>
                <div className="font-semibold">{msg.displayName}</div>
                <div className="text-sm">{msg.text}</div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-lg border 
              ${darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"}`}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    </PageWrapper>
  );
}
