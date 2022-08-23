import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqoVDEOO0IEurHxiW9N0nGoQXoEjI7tlE",
  authDomain: "foodfest-a1c45.firebaseapp.com",
  projectId: "foodfest-a1c45",
  storageBucket: "foodfest-a1c45.appspot.com",
  messagingSenderId: "380594955966",
  appId: "1:380594955966:web:46124ae3298ecf125360ef",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
