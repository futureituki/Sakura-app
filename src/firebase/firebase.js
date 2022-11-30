import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from '@/firebase/config'

if (!getApps()?.length) {
  initializeApp(firebaseConfig)
}
export const storage = getStorage()
export const auth = getAuth()
export const db = getFirestore()
