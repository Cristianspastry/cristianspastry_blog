// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuEvhPc4Gv7hlxVl-MP-_ruwbE3JgoSgU",
  authDomain: "cristian-s-pastry-93b16.firebaseapp.com",
  projectId: "cristian-s-pastry-93b16",
  storageBucket: "cristian-s-pastry-93b16.appspot.com",
  messagingSenderId: "42697165054",
  appId: "1:42697165054:web:b3146f88e25ec0fbeafdaf",
  measurementId: "G-0YNDC34S5F"
};

// Initialize Firebase
export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()

//const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
