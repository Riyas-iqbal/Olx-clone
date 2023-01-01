import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "olx-clone-3fdbc.firebaseapp.com",
  projectId: "olx-clone-3fdbc",
  storageBucket: "olx-clone-3fdbc.appspot.com",
  messagingSenderId: "856790837513",
  appId: "1:856790837513:web:fc65c193e13e04ade80bd8",
  measurementId: "G-66TQJP9YG2"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);