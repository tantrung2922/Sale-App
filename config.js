import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyA9jz3MITPu_1Rn5BrVzCJ6myif38_A29g",
    authDomain: "appmanager-69b88.firebaseapp.com",
    databaseURL: 'https://appmanager-69b88-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: "appmanager-69b88",
    storageBucket: "appmanager-69b88.appspot.com",
    messagingSenderId: "923817806567",
    appId: "1:923817806567:web:0ac99aea9a90f090bc3042",
    measurementId: "G-CWF1YFKQ9Z"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const db = getDatabase();

export {firebase, db};