import { cert, initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

if (!getApps()?.length) {
  initializeApp({
    credential: cert(process.env.FIREBASE_ADMIN_KEY as string),
  })
}

export const db = getFirestore()
