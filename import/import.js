// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyC4IXP-FZh1tOed4cjsyED0O3iBYHLMvws",
  authDomain: "eikern.firebaseapp.com",
  databaseURL: "https://eikern.firebaseio.com",
  projectId: "eikern",
  storageBucket: "eikern.appspot.com",
  messagingSenderId: "502019781694",
  appId: "1:502019781694:web:d68b7c9df8480eecf08d6f",
  measurementId: "G-DFZK907K08"
};
const app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();
const storage = firebase.storage();


console.log("Hei");