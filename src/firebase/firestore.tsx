import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { setDoc, getDoc, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/firebase'
import { User } from '@/types/user'
// export const getUser = (uid: string) => {
//   // 特定のユーザー取得処理
// }
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
            first_favorite: null,
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
      return false
    })
}
export const saveBookmark = async (id: string, bookmark: { [s: string]: string }) => {
  const userRef = doc(db, 'users', id)
  // const favorites = [...querySnapshot.data()?.favorite]
  // favorites.push(bookmark)
  await updateDoc(userRef, {
    first_favorite: bookmark,
  })
  return bookmark
}

export const logout = async() => {
  return await signOut(auth).then(() => {
    alert('ログアウトが成功しました')
  }).catch(err => {
    alert('ログアウトに失敗しました')
    console.log(err)
  })
}