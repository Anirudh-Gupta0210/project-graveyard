
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBJZdVhMg5IMbMj1zzPq5t2JNzqyadoSnw",
    authDomain: "project-graveyard-a5f26.firebaseapp.com",
    projectId: "project-graveyard-a5f26",
    storageBucket: "project-graveyard-a5f26.firebasestorage.app",
    messagingSenderId: "605854368153",
    appId: "1:605854368153:web:0ad165fa3608aa39fe5308",
    measurementId: "G-1DXR0QRV55"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export { db, auth };