// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0y6Pb1IOmJ2Ie4gh3q55_CUtnpECR5u0",
    authDomain: "friends-chat-6c791.firebaseapp.com",
    databaseURL:
        "https://friends-chat-6c791-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "friends-chat-6c791",
    storageBucket: "friends-chat-6c791.appspot.com",
    messagingSenderId: "858657768018",
    appId: "1:858657768018:web:6c01af63e83a773222558b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
