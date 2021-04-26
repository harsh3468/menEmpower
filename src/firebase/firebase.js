import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD9TtMd0uZ5yz0k8BklSBMw0YbKI7BSUCI",
    authDomain: "bolsale-dcf99.firebaseapp.com",
    databaseURL: "https://bolsale-dcf99.firebaseio.com",
    projectId: "bolsale-dcf99",
    storageBucket: "bolsale-dcf99.appspot.com",
    messagingSenderId: "679659662523",
    appId: "1:679659662523:web:520843e3aca160ddd5cd9e",
    measurementId: "G-0J123MJWSE"
  
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };