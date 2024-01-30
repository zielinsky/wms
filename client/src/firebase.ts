import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, User } from 'firebase/auth'
import React from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBlFOIOW7Ip1V-BpGFH9FbmAvX2Kd_LqQc",
    authDomain: "wms-ii.firebaseapp.com",
    projectId: "wms-ii",
    storageBucket: "wms-ii.appspot.com",
    messagingSenderId: "779284821070",
    appId: "1:779284821070:web:0791f786e4d52727a73f1f",
    measurementId: "G-6JDNFEZ1CP"
  };

initializeApp(firebaseConfig)
// export const _getAuth = () => getAuth() 
export const auth = getAuth()
// onAuthStateChanged(auth, (user: User | null) => {
//   if (user !== null) {
//     localStorage.setItem("is_auth", "true")
//   }
// })
// setPersistence(auth, browserLocalPersistence)