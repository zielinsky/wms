import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

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

const auth = getAuth() 

export { auth }