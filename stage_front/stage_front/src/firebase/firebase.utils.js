import firebase from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyD2goOr2ZykLpLb6JrSkcbZ2cdWPr0kbxc",
  authDomain: "myapi-55568.firebaseapp.com",
  projectId: "myapi-55568",
  storageBucket: "myapi-55568.appspot.com",
  messagingSenderId: "464868732412",
  appId: "1:464868732412:web:5a12309b72904fea82d679",
  measurementId: "G-5DZ60L75KB",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

