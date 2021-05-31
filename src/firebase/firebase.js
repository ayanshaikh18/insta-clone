import firebase from "firebase/app";
import 'firebase/analytics'
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "test-project-1ad71.firebaseapp.com",
  projectId: "test-project-1ad71",
  storageBucket: "test-project-1ad71.appspot.com",
  messagingSenderId: "933771958520",
  appId: "1:933771958520:web:85bafed43967a6d3bd830d",
  measurementId: "G-PJ5V8HX59Z",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
firebase.analytics();

export { storage, firebase as default };
