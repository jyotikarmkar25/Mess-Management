import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFE03ok6YS2fyBSgUN3AGf3vwXOm_gZ_M",
  authDomain: "mess-dashboard-c66c6.firebaseapp.com",
  projectId: "mess-dashboard-c66c6",
  storageBucket: "mess-dashboard-c66c6.firebasestorage.app",
  messagingSenderId: "148736325514",
  appId: "1:148736325514:web:ec6b5f179292b3149c3a73",
  measurementId: "G-RGL44KNNTK",
  databaseURL: "https://mess-dashboard-c66c6-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;