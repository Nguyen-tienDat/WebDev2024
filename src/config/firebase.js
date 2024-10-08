import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCy3oU_gQsEG2rB3tInXDeM_pE54hzxe9Y",
  authDomain: "webapp-d513f.firebaseapp.com",
  projectId: "webapp-d513f",
  storageBucket: "webapp-d513f.appspot.com",
  messagingSenderId: "107533683191",
  appId: "1:107533683191:web:cf160ae7b8b682f157c6f2",
  measurementId: "G-XTHHBR22QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };