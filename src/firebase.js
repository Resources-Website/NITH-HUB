import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDg2TyBN8wmhcC_7_70HpBJG6Hth6FTRp0",
    authDomain: "nithhub-bc619.firebaseapp.com",
    projectId: "nithhub-bc619",
    storageBucket: "nithhub-bc619.appspot.com",
    messagingSenderId: "488001460745",
    appId: "1:488001460745:web:eab3cbf10c57b185c1b6d8",
    measurementId: "G-TZ50RPTDMS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber };
