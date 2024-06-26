// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "valorantdcn-ea69e.firebaseapp.com",
  projectId: "valorantdcn-ea69e",
  storageBucket: "valorantdcn-ea69e.appspot.com",
  messagingSenderId: "641888513937",
  appId: "1:641888513937:web:b9dcfe885ddeae6685b430"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);