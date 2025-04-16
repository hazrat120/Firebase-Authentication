// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyOFc847hp4rCPLnkQE4HUxh_rCjra5zI",

  authDomain: "authentication-system-f716f.firebaseapp.com",

  projectId: "authentication-system-f716f",

  storageBucket: "authentication-system-f716f.firebasestorage.app",

  messagingSenderId: "98441333587",

  appId: "1:98441333587:web:50836e03c9e72d44fe2fa6",

  measurementId: "G-PQ203GP5NV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
