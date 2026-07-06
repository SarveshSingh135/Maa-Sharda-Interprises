import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu11k0kHFNs7UPP2GYx9IyGgmW6HoN8dQ",
  authDomain: "maa-sharda-enterprises.firebaseapp.com",
  projectId: "maa-sharda-enterprises",
  storageBucket: "maa-sharda-enterprises.firebasestorage.app",
  messagingSenderId: "258426554295",
  appId: "1:258426554295:web:edb10d54d89fd7e49b4a32",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;