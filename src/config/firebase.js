import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhMbduToNGsv9UUuBIzOeuOYFkFkItGOk",
  authDomain: "webapp-8a660.firebaseapp.com",
  projectId: "webapp-8a660",
  storageBucket: "webapp-8a660.appspot.com",
  messagingSenderId: "563117467310",
  appId: "1:563117467310:web:99a22eae8f405299266f3f",
  measurementId: "G-LYCRV19C0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };