import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore" 
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyBdYQybGj0fLkX5_Lsebqz9KL2x_-jUFvE",
    authDomain: "fireandsmoke-f33cc.firebaseapp.com",
    projectId: "fireandsmoke-f33cc",
    storageBucket: "fireandsmoke-f33cc.appspot.com",
    messagingSenderId: "103153567810",
    appId: "1:103153567810:web:3d6359345d4e7f97e6c5db",
    measurementId: "G-CPRJLK667E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  auth=getAuth(app)

export const db=getFirestore(app);

const app2=firebase.initializeApp(firebaseConfig)
const firestore = app2.firestore();
export {  firestore, firebase };
