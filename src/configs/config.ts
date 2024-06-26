import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBUJT56xRJIatx7GzBWowubWdnJ7BSc7vg',
  authDomain: 'gdsc-boilerplate.firebaseapp.com',
  projectId: 'gdsc-boilerplate',
  storageBucket: 'gdsc-boilerplate.appspot.com',
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_FIREBASE_KEY,
  measurementId: 'G-Y6Q2RQEZJP'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(app)
export default app
