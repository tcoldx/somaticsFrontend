import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDITfM0EAbzjfF0BtxV8urKDz-uDyY2GjA",
  authDomain: "somaticzapp.firebaseapp.com",
  projectId: "somaticzapp",
  storageBucket: "somaticzapp.appspot.com",
  messagingSenderId: "1083087121936",
  appId: "1:1083087121936:web:df1af464ece77fa34fe495",
  measurementId: "G-BGTSPE899Y",
};

// Check if the app is already initialized
const firebaseApp = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

// Try getting auth object
const auth = getAuth(firebaseApp);

// Check if initializeAuth has already been called
if (!auth) {
  try {
    // If auth is not present, initialize with persistence
    initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    // Handle any initialization errors
    console.error("Error initializing auth:", error);
  }
}

const db = firebaseApp.firestore();

export { auth, db, firebase };
