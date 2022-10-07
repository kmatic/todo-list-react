import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: 'AIzaSyAq6f3bv5bBHh1DSyw2pA5IywMUA-vqOrY',
    authDomain: 'todo-list-8b3f3.firebaseapp.com',
    projectId: 'todo-list-8b3f3',
    storageBucket: 'todo-list-8b3f3.appspot.com',
    messagingSenderId: '648857275339',
    appId: '1:648857275339:web:52d4a4e6365ed74708c44e',
    measurementId: 'G-KYQFLV4YKD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
