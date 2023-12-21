// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const apiKey= import.meta.env.VITE_FIREBASE_API_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "journeyjotterbooking.firebaseapp.com",
  projectId: "journeyjotterbooking",
  storageBucket: "journeyjotterbooking.appspot.com",
  messagingSenderId: "231197622818",
  appId: "1:231197622818:web:999a824e9b905233b5007b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);