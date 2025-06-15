// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./WebPage/Navbar";
import Footer from "./WebPage/Footer";
import Jobs from "./pages/Jobs";
import Universities from "./pages/Universities";
import TrackPage from "./pages/TrackPage";
import SemesterPage from "./pages/SemesterPage";
import ModulesPage from "./pages/ModulesPage";
import ModulesContentPage from "./pages/ModulesContentPage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthLayout from "./layouts/AuthLayout";
import Profile from "./pages/Profile";
import GeneralChat from "./pages/GeneralChat";
import ProfileChat from "./pages/ProfileChat";

//! Files of the Settings menu
import SettingsPage from "./pages/SettingsPage";
import LanguagePreference from "./pages/LanguagePreference";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import HelpSupport from "./pages/HelpSupport";
import Privacy from "./pages/Privacy";

import "./App.css";

// ✅ ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function App() {
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const location = useLocation();

  const noAnimateRoutes = ["/login", "/signup"];
  const isAuthPage = noAnimateRoutes.includes(location.pathname);
  const shouldAnimate = !isAuthPage;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const appRoutes = (
    <Routes location={location} key={location.pathname}>
      {/* Auth Pages */}
      <Route path="/login" element={<AuthLayout><LoginPage darkMode={darkMode} /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><SignupPage darkMode={darkMode} /></AuthLayout>} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Main App Pages */}
      <Route path="/jobs" element={<Jobs darkMode={darkMode} />} />
      <Route path="/universities" element={<Universities darkMode={darkMode} />} />
      <Route path="/tracks" element={<TrackPage darkMode={darkMode} />} />
      <Route path="/tracks/:trackId" element={<SemesterPage darkMode={darkMode} />} />
      <Route path="/tracks/:trackId/:semesterId" element={<ModulesPage darkMode={darkMode} />} />
      <Route path="/tracks/:trackId/:semesterId/:moduleId" element={<ModulesContentPage darkMode={darkMode} />} />
      <Route path="/calendar" element={<CalendarPage darkMode={darkMode} />} />
      <Route path="/profile" element={<Profile darkMode={darkMode} />} />
      <Route path="/general-chat" element={<GeneralChat darkMode={darkMode} />} />
      <Route path="/profile-chat/:uid" element={<ProfileChat darkMode={darkMode} />} />
      <Route path="/settings" element={<SettingsPage darkMode={darkMode} />} />
      <Route path="/settings/language" element={<LanguagePreference darkMode={darkMode} />} />
      <Route path="/settings/about" element={<About darkMode={darkMode} />} />
      <Route path="/settings/help" element={<HelpSupport darkMode={darkMode} />} />
      <Route path="/settings/privacy" element={<Privacy darkMode={darkMode} />} />
      <Route path="/settings/notifications" element={<Notifications darkMode={darkMode} />} />
    </Routes>
  );

  return (
    <div className={`flex flex-col min-h-screen transition-colors ${darkMode ? "bg-[#101828]" : "bg-white"}`}>
      <ScrollToTop />
      {!isAuthPage && (
        <Navbar darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />
      )}

      <main className="flex-grow px-6 py-8 transition-colors duration-300">
        {shouldAnimate ? (
          <AnimatePresence mode="wait">
            {appRoutes}
          </AnimatePresence>
        ) : (
          appRoutes
        )}
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
