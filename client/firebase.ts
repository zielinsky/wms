import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

let serviceAccount = require('./creds.json')
initializeApp()

const auth = getAuth() 


export { auth }