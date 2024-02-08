// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIb2adJ0HEbcJjormQRTK1bzarwpt61Uo",
  authDomain: "marblestore-b5f3a.firebaseapp.com",
  projectId: "marblestore-b5f3a",
  storageBucket: "marblestore-b5f3a.appspot.com",
  messagingSenderId: "733583843230",
  appId: "1:733583843230:web:350ad8c063034aa429c08f",
  measurementId: "G-N2XD0EE2P5",
  databaseURL:"https://marblestore-b5f3a-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()