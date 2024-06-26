import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

console.log("test");

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

let products = [];
let currentIdx = 0;
const limit = 12;

async function updateData(productOb) {
  const productData = {
    title: productOb.title,
    description: productOb.description,
    price: productOb.price,
    rating: productOb.rating,
    image: productOb.thumbnail,
  };

  try {
    const docRef = doc(db, "viewProduct", "singleProductData");
    await setDoc(docRef, productData);
    console.log("DataOverriden");
  } catch (e) {
    console.log("Error overrriding the data");
  }

  await updateUserCategory(productOb, productOb.category);
}

async function updateUserCategory(ob, categoryType) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in
      console.log("---> User is signed in:", user);
      const docRef = await doc(db, "User", user.uid);
      getDoc(docRef).then(async (snapshot) => {
        let data = snapshot.data();
        if (Array.isArray(data.category)) {
          // Check if temp already exists in the category array
          if (!data.category.includes(categoryType)) {
            // If not, push temp to the category array
            data.category.push(categoryType);
          }
        } else {
          // If category doesn't exist or is not an array, initialize it as an array with temp
          data.category = [categoryType];
        }

        console.log(data.category);
        await setDoc(docRef, data);
      });
    } else {
      // No user is signed in
      console.log("No user is signed in");
    }
  });
  setTimeout(() => {
    window.location.href = "product.html";
  }, 1000);
}

const trendingProductContainer = document.querySelector(".trending-products");
const loadingIndicator = document.querySelector("#loadingIndicator");
loadingIndicator.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
  fetch("js/product.json")
    .then((response) => response.json())
    .then((data) => {
      products = shuffleArray(data);
      loadProducts();
      window.addEventListener("scroll", scrollHandle);
    })
    .catch((e) => console.log("Could not fetch the product.json", e));
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadProducts() {
  const nextIndex = currentIdx + limit;
  const productToLoad = products.slice(currentIdx, nextIndex);

  productToLoad.forEach((e) => {
    const product = getProduct(e);

    trendingProductContainer.appendChild(product);
    trendingProductContainer.lastChild.addEventListener("click", async () => {
      await updateData(e);
      console.log(product);
    });
  });

  currentIdx = nextIndex;
  loadingIndicator.style.display = "none";
}

function scrollHandle() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    currentIdx < products.length
  ) {
    window.removeEventListener("scroll", scrollHandle);
    loadingIndicator.style.display = "block";
    
      loadProducts();
      window.addEventListener("scroll", scrollHandle);
   
  }
}

function getProduct(proObject) {
  const div = document.createElement("div");
  div.classList.add(
    "product-card",
    "w-full",
    "bg-white",
    "border",
    "border-gray-200",
    "rounded-lg",
    "shadow",
    "dark:border-gray-700"
  );

  div.innerHTML = `
    <a href="#">
        <img class="p-2 mx-auto rounded-t-lg size-10/12" src=${proObject.thumbnail} alt="product image" />
    </a>
    <div class="product-data px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">${proObject.title}</h5>
        </a>
        <div>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">${proObject.rating}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-black">$${proObject.price}</span>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
            </div>
        </div>
    </div>`;
  return div;
}

//Code to add the json product in the data base {do not uncomment it}
// console.log(productData[0]);

// const productCollection = collection(db, 'Products');
// const docRef = addDoc(productCollection, productData[0])

// productData.forEach(e => {
//     const docRef = addDoc(productCollection, e);
// })
