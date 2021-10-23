import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDcve6iHEruLx4LOBi4CL-TADX-etjIkOw",
  authDomain: "insta-native-10564.firebaseapp.com",
  projectId: "insta-native-10564",
  storageBucket: "insta-native-10564.appspot.com",
  messagingSenderId: "231981580234",
  appId: "1:231981580234:web:632af589fc02a94df21933",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export {firebase, db};
