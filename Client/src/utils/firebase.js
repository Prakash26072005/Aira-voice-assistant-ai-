// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getAnalytics} from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aira-voice-assistant.firebaseapp.com",
  projectId: "aira-voice-assistant",
  storageBucket: "aira-voice-assistant.firebasestorage.app",
  messagingSenderId: "477990918587",
  appId: "1:477990918587:web:d6f9d212e5ed678a0e8c9e",
  measurementId: "G-DN14LTHJKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app)
const provider= new GoogleAuthProvider()

export{auth,provider}