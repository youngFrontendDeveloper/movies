import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYPuwnXY9kXeFLoluOm7ORRAM57NDiv0Y",
  authDomain: "movies-a11de.firebaseapp.com",
  databaseURL: "https://movies-a11de-default-rtdb.firebaseio.com",
  projectId: "movies-a11de",
  storageBucket: "movies-a11de.appspot.com",
  messagingSenderId: "973593222595",
  appId: "1:973593222595:web:1985fe94db10220c713176"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore( app );