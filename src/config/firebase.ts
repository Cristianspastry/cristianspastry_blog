// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDi1yr4QYrMYIOEe4zsTTk3KGUk-m88L0",
  authDomain: "cristianspastry-5fb05.firebaseapp.com",
  projectId: "cristianspastry-5fb05",
  storageBucket: "cristianspastry-5fb05.firebasestorage.app",
  messagingSenderId: "805350259684",
  appId: "1:805350259684:web:5b6d55017dba80c347e5f1",
  measurementId: "G-95S5XC7FBJ"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
export const DB_Firestore = getFirestore(app);
//const analytics = getAnalytics(app); 