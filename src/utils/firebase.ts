import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxHEdSzkMDqjoHrgLbWgz4lQ8Sa0G646c",
  authDomain: "homeproject-ca142.firebaseapp.com",
  databaseURL: "https://homeproject-ca142.firebaseio.com",
  projectId: "homeproject-ca142",
  storageBucket: "homeproject-ca142.appspot.com",
  messagingSenderId: "1043437194905",
  appId: "1:1043437194905:web:4493932f1fa7ccaaa2b208",
  measurementId: "G-1G5NHYJ03R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const authGoogleProvider = new firebase.auth.GoogleAuthProvider();
export const authFacebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;
