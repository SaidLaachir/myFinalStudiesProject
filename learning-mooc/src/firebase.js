// Import Firebase core and services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDjoWV8tkHJbVjfXNILcjWD2thA6FJ2CAM",
  authDomain: "kraonlinedatabase.firebaseapp.com",
  projectId: "kraonlinedatabase",
  storageBucket: "kraonlinedatabase.firebasestorage.app",
  messagingSenderId: "942616325183",
  appId: "1:942616325183:web:50f53e23400156130b9c8a",
  measurementId: "G-VQCYQY9EEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);