// js/firebase.js

// Import Firebase directly from Google’s CDN (this works in browsers)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔧 Replace these values with your own Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "anyone-home-yrw.firebaseapp.com",
  projectId: "anyone-home-yrw",
  storageBucket: "anyone-home-yrw.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("✅ Firebase initialized");
