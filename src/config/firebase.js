import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCi-z7q8RQA99abaUhACFuYr_5dwR4Khwc",
  authDomain: "taskmanagement-5e455.firebaseapp.com",
  projectId: "taskmanagement-5e455",
  storageBucket: "taskmanagement-5e455.appspot.com",
  messagingSenderId: "829743586845",
  appId: "1:829743586845:web:046ebe748c808e626430f4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth };