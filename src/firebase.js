

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_qx3sLgF_6WxkxVS1i_8Y6jFxLCb9YYY",
  authDomain: "zonelifyv2.firebaseapp.com",
  projectId: "zonelifyv2",
  storageBucket: "zonelifyv2.appspot.com",
  messagingSenderId: "823448730692",
  appId: "1:823448730692:web:8564ae295b3879521ad011"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();