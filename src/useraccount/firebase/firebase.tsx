import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyCRN7uThq2JUhGdUVaT2PilJ4jTjmtsOoA",
    authDomain: "nifty-inkwell-402121.firebaseapp.com",
    projectId: "nifty-inkwell-402121",
    storageBucket: "nifty-inkwell-402121.appspot.com",
    messagingSenderId: "298342754306",
    appId: "1:298342754306:web:72bc01608fcd5a6787df1b",
    measurementId: "G-M38MT0CS7B"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
const db = getFirestore(app);



export { db, auth };
