import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAphQ0EabJWwlAREQa028k9J4x5zFnXpq8",
  authDomain: "loginsignup-b3123.firebaseapp.com",
  projectId: "loginsignup-b3123",
  storageBucket: "loginsignup-b3123.appspot.com",
  messagingSenderId: "519789376724",
  appId: "1:519789376724:web:6dcc22ff06340428c9f741",
  measurementId: "G-QJJYFSRSS8",
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
