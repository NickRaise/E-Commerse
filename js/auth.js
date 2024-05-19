console.log('Start auth.js');


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {getFirestore, collection, getDocs, doc, setDoc} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'

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
  measurementId: "G-7MBHKFJ1HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
console.log("this is auth ->",auth);


console.log('------');




// Register the user
function registerUser() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userDetail) => {
      const user = userDetail.user;
      console.log("user uid = ",user.uid);

      try {
        const firebaseCollection = collection(db, 'User');
        const userDocRef = doc(firebaseCollection, user.uid);
        setDoc(userDocRef, {name, email})
          .then(() => {
            alert("User registered!");
          })
          .catch((error) => {
            console.error("Error setting user data:", error);
          });
      }
      catch(e) {
        console.log('Failed to work on database collection ->', e);
      }
    })
    .catch((error) => {
      console.log('Error ->',error);
    })
}


// Invoking registerUser method after clicking on submit
document.querySelector("#register-user").addEventListener("click", (event) => {
  event.preventDefault();
  registerUser();
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
