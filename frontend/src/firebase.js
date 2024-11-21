import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfe3SWDJONmZwldX5metlnPdnf9n16JqM",
  authDomain: "touristmanagement-64081.firebaseapp.com",
  projectId: "touristmanagement-64081",
  storageBucket: "touristmanagement-64081.firebasestorage.app",
  messagingSenderId: "588346621073",
  appId: "1:588346621073:web:e22d8f75ccaa7fd7ac9330",
  measurementId: "G-GR9WYQ0FE4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider(); 
const db = getFirestore(app);

export { auth, provider, facebookProvider, db };