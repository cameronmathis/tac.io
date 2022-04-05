import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlozCM8uRov_73nBj-fk5VF70h0Ysr060",
  authDomain: "tacio-clmat.firebaseapp.com",
  databaseURL: "https://tacio-clmat-default-rtdb.firebaseio.com",
  projectId: "tacio-clmat",
  storageBucket: "tacio-clmat.appspot.com",
  messagingSenderId: "3090956232",
  appId: "1:3090956232:web:777eeb27c7610d47798afd",
  measurementId: "G-JE4QX5ZD7X",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const usersRef = ref(database, "users/");
export const gamesRef = ref(database, "games/");
