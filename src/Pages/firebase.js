import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut 
} from "firebase/auth";
import {
    getFirestore, doc, setDoc, collection, addDoc, serverTimestamp, getDocs,
    query, where, onSnapshot, orderBy, deleteDoc, updateDoc
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCdslP7hBQgC5oiFl6L5nGycCB-OaoGfgE",
    authDomain: "fir-9f2d4.firebaseapp.com",
    projectId: "fir-9f2d4",
    storageBucket: "fir-9f2d4.appspot.com",
    messagingSenderId: "310645348429",
    appId: "1:310645348429:web:ff7d0deb0c528ade5d6404",
    measurementId: "G-PRZ9601GQQ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    app, db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc,
    setDoc, onAuthStateChanged, collection, addDoc, serverTimestamp, getDocs,
    query, where, onSnapshot, orderBy, deleteDoc, updateDoc, signOut 
}
