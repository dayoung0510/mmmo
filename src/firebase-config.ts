// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBepvM7pOzFIqZpaZ6tij4UgYjKQWZyuy0",
  authDomain: "mmmo-dc98a.firebaseapp.com",
  projectId: "mmmo-dc98a",
  storageBucket: "mmmo-dc98a.appspot.com",
  messagingSenderId: "1030902489593",
  appId: "1:1030902489593:web:282183b21469f21ddadd28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
