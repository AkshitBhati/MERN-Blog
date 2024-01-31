import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

  const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b38d8.firebaseapp.com",
  projectId: "mern-blog-b38d8",
  storageBucket: "mern-blog-b38d8.appspot.com",
  messagingSenderId: "362937679854",
  appId: "1:362937679854:web:3854dccfa3c426eaf418ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { app, auth }