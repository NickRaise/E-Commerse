import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {getFirestore, collection, getDocs, doc, setDoc, addDoc} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyAfvkCmr4DiHoqnojqpw98iQOChgHkVn9Y",
    authDomain: "shopsphere-67451.firebaseapp.com",
    projectId: "shopsphere-67451",
    storageBucket: "shopsphere-67451.appspot.com",
    messagingSenderId: "816529413111",
    appId: "1:816529413111:web:f18d7622f2f3b6827594f2",
    measurementId: "G-7MBHKFJ1HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();




