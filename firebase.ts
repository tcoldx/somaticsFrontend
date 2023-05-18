import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDITfM0EAbzjfF0BtxV8urKDz-uDyY2GjA",
  authDomain: "somaticzapp.firebaseapp.com",
  projectId: "somaticzapp",
  storageBucket: "somaticzapp.appspot.com",
  messagingSenderId: "1083087121936",
  appId: "1:1083087121936:web:df1af464ece77fa34fe495",
  measurementId: "G-BGTSPE899Y",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db, firebase };
