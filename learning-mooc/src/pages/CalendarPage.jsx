import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css'; // ✅ Import your custom CSS override
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

export default function CalendarPage({ darkMode }) {
  const [date, setDate] = useState(new Date());

  return (
    <PageWrapper>

    <div className={`p-6 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#101828] text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Your Calendar</h1>
      <div className="flex justify-center">
        <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'calendar-dark' : ''}`}>
          <Calendar
            onChange={setDate}
            value={date}
          />
        </div>
      </div>
      <p className="text-center mt-4">
        Selected Date: <strong>{date.toDateString()}</strong>
      </p>
    </div>
    </PageWrapper>
  );
}
