// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQJKzUjrUUd7u0m5ub4xHQYkijShqs-3w",
  authDomain: "seniorbuddy-37282.firebaseapp.com",
  projectId: "seniorbuddy-37282",
  storageBucket: "seniorbuddy-37282.appspot.com",
  messagingSenderId: "178745188793",
  appId: "1:178745188793:web:302bbbe15689e9e34b9668",
  measurementId: "G-8XEFB74L6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app)
const auth=getAuth(app)
const storage=getStorage(app)
export {app, analytics, db, storage, auth}