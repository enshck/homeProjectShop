import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdFQhVCmvGg3Llt2Sfc_RGOm_DHYOyPTk",
  authDomain: "homeproject-86608.firebaseapp.com",
  databaseURL: "https://homeproject-86608.firebaseio.com",
  projectId: "homeproject-86608",
  storageBucket: "homeproject-86608.appspot.com",
  messagingSenderId: "888815962739",
  appId: "1:888815962739:web:025f0c14dfa1cef4253806",
  measurementId: "G-LT6DZXVEY0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
