import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Globe,
  Bell,
  Shield,
  HelpCircle,
  Info
} from "lucide-react";

export default function SettingsPage({ darkMode }) {
  const settings = [
    { name: "My Profile", icon: <User size={20} />, link: "/profile" },
    { name: "Language Preferences", icon: <Globe size={20} />, link: "/settings/language" },
    { name: "Notification Settings", icon: <Bell size={20} />, link: "/settings/notifications" },
    { name: "Privacy & Security", icon: <Shield size={20} />, link: "/settings/privacy" },
    { name: "Help & Support", icon: <HelpCircle size={20} />, link: "/settings/help" },
    { name: "About", icon: <Info size={20} />, link: "/settings/about" }
  ];

  return (
    <PageWrapper>
      <div className={`min-h-screen p-6 ${darkMode ? "bg-[#101828] text-white" : "bg-white text-gray-900"}`}>
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <SettingsIcon size={28} />
          Settings
        </h1>
        <div className="space-y-4">
          {settings.map((item, idx) => (
            <Link to={item.link} key={idx}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center justify-between p-4 rounded-xl shadow-md cursor-pointer transition
                  ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>&gt;</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
