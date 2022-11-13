import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCV9wUlrqUhZc4ODJoqT0yWppyymNM9VvQ",
    authDomain: "e-working-ac680.firebaseapp.com",
    projectId: "e-working-ac680",
    storageBucket: "e-working-ac680.appspot.com",
    messagingSenderId: "1052923549521",
    appId: "1:1052923549521:web:bb26575ff84f1cff546570",
    measurementId: "G-F1GWRJ2YR8",
};

const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseApp = firebaseApp