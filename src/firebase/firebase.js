import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import firebaseConfig from '@/firebase/config'
if (!getApps()?.length) {
  initializeApp(firebaseConfig)
}
console.log(firebaseConfig.apiKey)
export const storage = getStorage()
export const auth = getAuth()
export const db = getFirestore()
