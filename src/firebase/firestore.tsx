import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { setDoc, getDoc, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

export const logout = async () => {
  await signOut(auth)
    .then(() => {
      alert('ログアウトが成功しました')
    })
    .catch((err) => {
      alert('ログアウトに失敗しました')
      console.log(err)
    })
}

export const usePasswordReset = () => {
  const router = useRouter()

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const passwordReset = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
      .catch((err) => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { success, error, passwordReset }
}

export const saveImage = async (uid: string, src: string, srcs: Array<string>) => {
  console.log(srcs)
  const colRef = doc(db, 'images', uid)
  srcs = Object.assign([], srcs)
  srcs.push(src)
  console.log(colRef)
  const data = {
    uid: uid,
    src: srcs,
  }
  await setDoc(colRef, data)
  console.log('test2')
  return src
}
type data = {
  uid: string
  src: Array<string>
}
export const deleteImg = async (uid: string, src: string, srcs: Array<string>) => {
  const colRef = doc(db, 'images', uid)
  srcs = Object.assign([], srcs)
  const newSrcs = srcs.filter((value) => value != src)
  const data: data = {
    uid: uid,
    src: newSrcs,
  }
  await setDoc(colRef, data)
  return src
}

type Props = {
  src: Array<string>
  uid: string
}
export const setImg = async (uid: string, sign?: boolean) => {
  if (sign) {
    return []
  }
  const images = await getDoc(doc(db, 'images', uid)).then((doc) => {
    return doc.data() as Props
  })
  return images.src
}
