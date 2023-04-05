import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvC6gyPN8-vbBi7tB_uJgHBCcwoSzDeTQ",
  authDomain: "indusuniapp-df82f.firebaseapp.com",
  projectId: "indusuniapp-df82f",
  storageBucket: "indusuniapp-df82f.appspot.com",
  messagingSenderId: "873555710986",
  appId: "1:873555710986:web:eb5a8781c34a9224f4bbf3",
  measurementId: "G-4NV2YLF6JK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
