import React, { useEffect, useState } from "react";
import UniversityCard from "../WebPage/UniversityCard";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "./PageWrapper";

const universities = [
  { name: "UMP", image: "/univ-pics/UMP.png", url: "https://www.ump.ma/" },
  { name: "UM5", image: "/univ-pics/UM5.webp", url: "https://www.um5.ac.ma" },
  { name: "Ibn Tofail", image: "/univ-pics/IbnTofail.webp", url: "https://www.uit.ac.ma" },
  { name: "Moulay Ismail", image: "/univ-pics/MoulayIsmail.webp", url: "https://www.umi.ac.ma" },
  { name: "1337", image: "/univ-pics/1337.jpg", url: "https://1337.ma" },
  { name: "Cadi Ayyad University", image: "/univ-pics/cadiayyad.jpg", url: "https://www.uca.ma" },
  { name: "Mohammed Ben Abdellah University of Fes", image: "/univ-pics/usmba.jpg", url: "https://www.usmba.ac.ma" },
  { name: "ENSAK", image: "/univ-pics/ensak.png", url: "https://ensa.uit.ac.ma/" },
  { name: "ENSAM Meknes", image: "/univ-pics/ensam.jpg", url: "http://www.ensam-umi.ac.ma/" },
  { name: "ENIADB", image: "/univ-pics/ENIAD.jpg", url: "https://eniad.ump.ma/" },
  { name: "EMI", image: "/univ-pics/emi.png", url: "https://www.emi.ac.ma" },
  { name: "EHTP", image: "/univ-pics/ehtp.jpg", url: "https://www.ehtp.ac.ma" },
  { name: "ENSAO", image: "/univ-pics/ensaoujda.jpeg", url: "https://www.ensamaroc.com/school/9" },
  { name: "ENSAM Casablanca", image: "/univ-pics/ENSAMC.jpeg", url: "https://ensam-casa.ma/" },
  { name: "ENIM", image: "/univ-pics/ENIM.jpg", url: "https://www.enim.ac.ma/" },
  { name: "UM6P", image: "/univ-pics/UM6P.jpeg", url: "https://um6p.ma/fr" },
  { name: "EMSI", image: "/univ-pics/EMSI.jpg", url: "https://emsi.ma/" },
  { name: "ENA", image: "/univ-pics/ENA.jpg", url: "https://www.enarabat.ac.ma/" },
];

export default function Universities({ darkMode }) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      const alreadyWelcomed = sessionStorage.getItem("welcomeShown");

      if (user && !alreadyWelcomed) {
        try {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.firstName) {
              setFirstName(data.firstName);
              sessionStorage.setItem("welcomeShown", "true");

              setTimeout(() => {
                setFirstName("");
              }, 5000);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <PageWrapper>
      <div className="pb-10">
        {/* Animated Welcome Message */}
        <AnimatePresence>
          {firstName && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`mx-auto mt-6 mb-4 p-4 w-fit rounded-lg text-center font-semibold shadow ${
                darkMode ? "bg-gray-800 text-white" : "bg-green-100 text-green-800"
              }`}
            >
              Welcome {firstName}! Enjoy your learning journey!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Title */}
        <h1
          className={`text-4xl font-bold text-center mb-8 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          ACADEMIC INSTITUTIONS
        </h1>

        {/* University Cards */}
        <div className="p-6 flex flex-wrap gap-6 justify-center">
          {universities.map((uni, idx) => (
            <UniversityCard
              key={idx}
              name={uni.name}
              image={uni.image}
              url={uni.url}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
