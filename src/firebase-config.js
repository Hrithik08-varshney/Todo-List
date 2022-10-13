// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9LPOaLXl-RraqnIleyrkFalgorvCsWeY",
  authDomain: "todo-list-540b0.firebaseapp.com",
  projectId: "todo-list-540b0",
  storageBucket: "todo-list-540b0.appspot.com",
  messagingSenderId: "159076269129",
  appId: "1:159076269129:web:b4b2e81dc89a3d2e2e5398"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
export {db} ;