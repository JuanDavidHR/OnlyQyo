import firebase from 'firebase'
import "firebase/firestore";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC1ES3mqv3BNqSXXETn4zpqBeq5L_43qNg",
    authDomain: "sinnombrev01.firebaseapp.com",
    projectId: "sinnombrev01",
    storageBucket: "sinnombrev01.appspot.com",
    messagingSenderId: "788526537732",
    appId: "1:788526537732:web:865fef44697413eea4e951"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
    firebase,
    db
};
