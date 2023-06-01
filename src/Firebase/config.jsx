import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDACfKQcymsXD3E7ENw3wAtZWvCL1XKokQ",
  authDomain: "olx-5f52a.firebaseapp.com",
  projectId: "olx-5f52a",
  storageBucket: "olx-5f52a.appspot.com",
  messagingSenderId: "685567435311",
  appId: "1:685567435311:web:ba8348649bbd866f2bdcda",
  measurementId: "G-K71SMTH0F4",
};
// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);
export const db = getFirestore(Firebase);


export default Firebase;
