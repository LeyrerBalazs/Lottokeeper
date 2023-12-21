import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA-N2sxGQdAEgkbqlxugmxn4dP8ZA2w0dI",
    authDomain: "lottokeeper-33f46.firebaseapp.com",
    projectId: "lottokeeper-33f46",
    storageBucket: "lottokeeper-33f46.appspot.com",
    messagingSenderId: "705838925637",
    appId: "1:705838925637:web:0a2bfc3c4da8e10671e02c", 
    measurementId: "G-YG3Y53PPFL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  