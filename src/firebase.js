import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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

export { auth, provider };


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDg2TyBN8wmhcC_7_70HpBJG6Hth6FTRp0",
//   authDomain: "nithhub-bc619.firebaseapp.com",
//   projectId: "nithhub-bc619",
//   storageBucket: "nithhub-bc619.appspot.com",
//   messagingSenderId: "488001460745",
//   appId: "1:488001460745:web:eab3cbf10c57b185c1b6d8",
//   measurementId: "G-TZ50RPTDMS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);