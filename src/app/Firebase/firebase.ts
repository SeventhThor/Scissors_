// src/firebase/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyDB7XAHzIt6_QDlT-T3_3VY63N_IbVP9mc",
    authDomain: "sniplink-url-shortener.firebaseapp.com",
    projectId: "sniplink-url-shortener",
    storageBucket: "sniplink-url-shortener.appspot.com",
    messagingSenderId: "625124249216",
    appId: "1:625124249216:web:60da302a6abbd8976f6065",
    measurementId: "G-CWY66WRP5N"
  };
  
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, firestore, googleProvider };
