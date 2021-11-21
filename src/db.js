// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBD8ZfwXt_8JUtef6W53eB1MtsLP0w_QOM",
    authDomain: "proyecto-final-fpi.firebaseapp.com",
    projectId: "proyecto-final-fpi",
    storageBucket: "proyecto-final-fpi.appspot.com",
    messagingSenderId: "882579207443",
    appId: "1:882579207443:web:a7099ee497bd0674fb96e6"
  };
  
const app = firebase.initializeApp(firebaseConfig);

//export const db = firebase
  //  .initializeApp({ projectId: 'proyecto-final-fpi' })
    //.firestore()
export const db=app.firestore()
export const storage=app.storage()


// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
