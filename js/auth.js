console.log("Start auth.js");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfvkCmr4DiHoqnojqpw98iQOChgHkVn9Y",
  authDomain: "shopsphere-67451.firebaseapp.com",
  projectId: "shopsphere-67451",
  storageBucket: "shopsphere-67451.appspot.com",
  messagingSenderId: "816529413111",
  appId: "1:816529413111:web:f18d7622f2f3b6827594f2",
  measurementId: "G-7MBHKFJ1HR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

console.log("------");

// Register the user
function registerUser() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (name && email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userDetail) => {
        const user = userDetail.user;
        console.log("user uid = ", user.uid);

        try {
          const userCollection = collection(db, "User");
          const userDocRef = doc(userCollection, user.uid);
          setDoc(userDocRef, { name, email })
            .then(() => {
              console.log("User registered!");
              window.location.href = "index.html";
            })
            .catch((error) => {
              console.error("Error setting user data:", error);
            });
        } catch (e) {
          console.log("Failed to work on database collection ->", e);
        }
      })
      .catch((error) => {
        const displayError = document.querySelector(".signup-error");
        displayError.innerHTML = "Invalid email / User already registered";
        console.log("this Error ->", error);
      });
  } else {
    console.log("entered in invalid");

    const displayError = document.querySelector(".signup-error");
    displayError.innerHTML = "Name, email and password are required!";
  }
}

// Invoking registerUser method after clicking on submit
const registerBtn = document.querySelector("#register-user");
if (registerBtn) {
  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    registerUser();
  });
}

// Login the User
function loginUser() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  console.log(email, password);

  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userDetail) => {
        console.log("Login Successfully!");
        window.location.href = "index.html";
      })
      .catch((e) => {
        console.log("User not Found");
        const displayError = document.querySelector(".login-error");
        displayError.innerHTML = "Email not Registered!";
      });
  } else {
    const displayError = document.querySelector(".login-error");
    displayError.innerHTML = "Email and password are required!";
  }
}

// Invoking loginUser method after clicking on submit
const loginBtn = document.querySelector("#login-user");
if (loginBtn) {
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    loginUser();
  });
}









auth.onAuthStateChanged((user) => {
  if (user) {
      // User is signed in
      console.log('User is signed in:', user);
        document.querySelector(".nav-login").style.display = 'none';
        document.querySelector(".nav-register").style.display = 'none';

  } else {
      // No user is signed in
      console.log('No user is signed in');
      if (window.location.pathname.includes('dashboard.html')) {
          window.location.href = 'login.html';
      }
      
  }
});

// Reference Code for fetching data from the database
// async function getData(db) {
//   const name = collection(db, 'User');
//   const nameSpnapshot = await getDocs(name);
//   nameSpnapshot.forEach(element => {
//     console.log(element.data());
//     console.log(element.data().name);
//   });
// }

// getData(db);
