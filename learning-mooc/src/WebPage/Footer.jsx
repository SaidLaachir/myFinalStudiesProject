import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-l from-[#0000FF] to-[#5CD5E8] dark:from-[#155DFC] dark:to-[#5CD5E8] text-white text-center p-6 mt-12 shadow-inner">
      <p className="font-semibold text-lg">&copy; {new Date().getFullYear()} 9raOnline</p>
      <p className="mt-2">Developed by Said Laachir</p>
      <p className="mt-1">Email: said.laachir@uit.ac.ma</p>
      <p className="mt-1">Offered to Ibn Tofail University</p>
    </footer>
  );
}
