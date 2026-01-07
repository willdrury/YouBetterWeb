import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAs7me4_DPLlSK75ej2JfnK9UBTeLYfrkQ",
    authDomain: "dodecathlon12.firebaseapp.com",
    projectId: "dodecathlon12",
    storageBucket: "dodecathlon12.firebasestorage.app",
    messagingSenderId: "365380606260",
    appId: "1:365380606260:web:b5621d7168315e728f6d61",
    measurementId: "G-84HGJNE7EM"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };