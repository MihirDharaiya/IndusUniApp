// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1emvN8vmZMGQ-mBbr-Ch2U3YAJhtKHSA",
  authDomain: "indusproject-70519.firebaseapp.com",
  projectId: "indusproject-70519",
  storageBucket: "indusproject-70519.appspot.com",
  messagingSenderId: "842788548538",
  appId: "1:842788548538:web:a5b9ba99ab7af2b5243783",
  measurementId: "G-WRPXM07TQ4",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth };
// const analytics = getAnalytics(app);
