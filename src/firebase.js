// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBy1gH65qewMUZa9aKMSyckM0xr6SPQDhU",
  authDomain: "imagepostcommentlike.firebaseapp.com",
  projectId: "imagepostcommentlike",
  storageBucket: "imagepostcommentlike.appspot.com",
  messagingSenderId: "37815532782",
  appId: "1:37815532782:web:b10350c40ba6d267ea07ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
