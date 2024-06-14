// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ1e32H9KOamjF4v6gwsATgH13nFjnU_M",
  authDomain: "login-autenticacao-33035.firebaseapp.com",
  projectId: "login-autenticacao-33035",
  storageBucket: "login-autenticacao-33035.appspot.com",
  messagingSenderId: "336548679555",
  appId: "1:336548679555:web:1cc49372ef3c6c976d30b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFB = getAuth(app);
const db = getFirestore(app);
export const firestoreDB = db;