import {initializeApp, cert} from "firebase-admin/app"
import {getFirestore} from "firebase-admin/firestore"
import {getAuth} from "firebase-admin/auth"

let serviceAccount = require('./creds.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()
const auth = getAuth() 

export { db, auth }