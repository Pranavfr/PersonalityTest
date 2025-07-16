import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5KR_uMm2GKQ5kkfa8fDkWCLigogMTIn4",
  authDomain: "personality-test-517c8.firebaseapp.com",
  projectId: "personality-test-517c8",
  storageBucket: "personality-test-517c8.appspot.com", // fixed typo
  messagingSenderId: "617233114632",
  appId: "1:617233114632:web:0fe369fa57483dc601d3bd",
  measurementId: "G-5XY9Z0MDXZ"
};

// Initialize Firebase (prevent re-initialization in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Optionally initialize analytics (only in browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);

export { app, analytics, db }; 