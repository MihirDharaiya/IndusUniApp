// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCvC6gyPN8-vbBi7tB_uJgHBCcwoSzDeTQ",
  authDomain: "indusuniapp-df82f.firebaseapp.com",
  projectId: "indusuniapp-df82f",
  storageBucket: "indusuniapp-df82f.appspot.com",
  messagingSenderId: "873555710986",
  appId: "1:873555710986:web:4538400ac10f6c3af4bbf3",
  measurementId: "G-TD20WZDLJJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
