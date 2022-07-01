import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA01CcvBRJcANg-OTibRuxqxFf8OiQCli0",
    authDomain: "codelogixtest.firebaseapp.com",
    projectId: "codelogixtest",
    storageBucket: "codelogixtest.appspot.com",
    messagingSenderId: "1072910370936",
    appId: "1:1072910370936:web:353aee12def3c4c435858d",
    measurementId: "G-GW337R3LEF"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export default db;