// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyABpH8SKur_Biphjvo7cURn6_OYSTenQ34",
  authDomain: "tripwiser-e5326.firebaseapp.com",
  projectId: "tripwiser-e5326",
  storageBucket: "tripwiser-e5326.appspot.com",
  messagingSenderId: "500730995749",
  appId: "1:500730995749:web:0383b0f2fdf01938a0cbcc",
  measurementId: "G-4Y3F997CH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app)

export { auth ,db};