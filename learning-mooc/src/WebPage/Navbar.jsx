import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ darkMode, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileLinksOpen, setMobileLinksOpen] = useState(false);
  const [showChatDot, setShowChatDot] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Jobs", to: "/jobs" },
    { name: "Universities", to: "/universities" },
    { name: "Tracks", to: "/tracks" },
    { name: "General Chat", to: "/general-chat" },
  ];

  useEffect(() => {
    if (location.pathname === "/general-chat") {
      localStorage.setItem("chatSeen", "true");
      setShowChatDot(false);
    } else {
      const seen = localStorage.getItem("chatSeen") === "true";
      setShowChatDot(!seen);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[aria-label="Toggle main links"]')
      ) {
        setMobileLinksOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 bg-gradient-to-l from-[#0000FF] to-[#5CD5E8] dark:from-[#155DFC] dark:to-[#5CD5E8] shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <a href="https://www.uit.ac.ma" target="_blank" rel="noopener noreferrer">
            <img
              src="/univ-pics/IbnTofIcon.png"
              alt="University Logo"
              className="w-10 h-10 rounded-md bg-white object-contain"
            />
          </a>
          <div className="text-2xl font-bold text-white">9raOnline</div>
        </div>

        <nav className="hidden md:flex flex-grow justify-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="relative px-4 py-2 rounded-lg text-white transition duration-300 hover:scale-105 hover:bg-purple-600 dark:hover:bg-purple-500"
            >
              {link.name}
              {link.name === "General Chat" && showChatDot && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            className="text-white text-xl p-2 rounded hover:bg-purple-600 dark:hover:bg-purple-500"
            onClick={() => navigate("/profile")}
            aria-label="Go to profile"
          >
            <FaUser className="w-6 h-6" />
          </button>

          <button
            className="md:hidden text-white text-xl p-2 rounded hover:bg-purple-600 dark:hover:bg-purple-500"
            onClick={() => setMobileLinksOpen(!mobileLinksOpen)}
            aria-label="Toggle main links"
          >
            ☰
          </button>

          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-purple-600 dark:hover:bg-purple-500 transition"
              aria-label="Open settings"
            >
              <span className="text-white text-xl">⋮</span>
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#101828] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-40"
              >
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/calendar"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Calendar
                </Link>
                <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="text-gray-800 dark:text-gray-200">
                    Dark Theme
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={toggleDark}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileLinksOpen && (
          <motion.nav
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-[#101828] px-4 pb-2 shadow-inner overflow-hidden"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMobileLinksOpen(false)}
                className="relative block py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {link.name}
                {link.name === "General Chat" && showChatDot && (
                  <span className="absolute top-1 right-4 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
