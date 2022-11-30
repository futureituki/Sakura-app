import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { setDoc, getDoc, doc, Timestamp, collection, where, query } from 'firebase/firestore'
import { auth, db } from '@/firebase/firebase'
import { User } from '@/types/user'
export const getUser = (uid: string) => {
  // 特定のユーザー取得処理
}
export const signUp = async (username: string, email: string, password: string): Promise<any> => {
  return await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    if (userCredential) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid
          const timestamp = Timestamp.now()
          const data: User = {
            uid: uid,
            username: username,
            email: email,
            password: password,
            created_at: timestamp,
            updated_at: timestamp,
            favorite: [],
          }
          const colRef = doc(db, 'users', uid)
          setDoc(colRef, data)
        }
      })
    }
    return userCredential.user
  })
}
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const uid = result.user.uid
      const user = getDoc(doc(db, 'users', uid)).then((doc) => {
        return doc.data()
      })
      return user
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
    })
}
