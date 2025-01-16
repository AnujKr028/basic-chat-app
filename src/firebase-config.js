// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyAdCAXyhPX8gWOn-qlUMD5rWwsZjfSU_rI",
  authDomain: "chat-app-506c6.firebaseapp.com",
  projectId: "chat-app-506c6",
  storageBucket: "chat-app-506c6.firebasestorage.app",
  messagingSenderId: "220489032112",
  appId: "1:220489032112:web:c82188f1d437fd6bf73675",
  measurementId: "G-YNFPPEVXMN"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ; 
export const provider = new GoogleAuthProvider() ;
export const db = getFirestore(app) ;


