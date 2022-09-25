// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// using Google auth
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// connect database 
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADRHocqqF7v67OJaDBiVdEn3UxbhYJbdU",
  authDomain: "first-firebase-22436.firebaseapp.com",
  projectId: "first-firebase-22436",
  storageBucket: "first-firebase-22436.appspot.com",
  messagingSenderId: "163735945411",
  appId: "1:163735945411:web:5b47896f0f191fd8616276"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export allow other component can access user infomation
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// how to use in login page ↓↓↓ 
// import { auth, provider } from '../config/firebase';
// <button onClick={signInWithGoogle}>Sign in with google</button>
// const result = await signInWithPopup(auth, provider);

// allows other component to store data into database
export const db = getFirestore(app);
// how to use in login page ↓↓↓ 
// import { db } from '../../config/firebase';
// import { addDoc, collection } from 'firebase/firestore';
// const postsRef = collection( db, "posts");
// await addDoc(postsRef, { title: ... , description: ... })
