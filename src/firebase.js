// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD8ZfwXt_8JUtef6W53eB1MtsLP0w_QOM",
  authDomain: "proyecto-final-fpi.firebaseapp.com",
  projectId: "proyecto-final-fpi",
  storageBucket: "proyecto-final-fpi.appspot.com",
  messagingSenderId: "882579207443",
  appId: "1:882579207443:web:3b8e51f32149cd74fb96e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export storage
export const storage=app.storage()
