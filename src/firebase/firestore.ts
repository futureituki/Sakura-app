import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { setDoc, getDoc, doc, Timestamp, updateDoc, collection, addDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth, db, storage } from '@/firebase/firebase'
import { Community } from '@/types/community'
import { User } from '@/types/user'
// export const getUser = (uid: string) => {
//   // 特定のユーザー取得処理
// }
export const signUp = async (username: string, email: string, password: string): Promise<any> => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  const id = await result.user.getIdToken()
  await fetch('/api/auth/user/session', { method: 'POST', body: JSON.stringify({ id }) })
  if (result.user) {
    const uid = result.user.uid
    const timestamp = Timestamp.now()
    const data: User = {
      uid: uid,
      username: username,
      email: email,
      password: password,
      created_at: timestamp,
      updated_at: timestamp,
      favorite: [
        { name: '未登録', src: 'no-image-person.jpeg' },
        { name: '未登録', src: 'no-image-person.jpeg' },
        { name: '未登録', src: 'no-image-person.jpeg' },
      ],
      first_favorite: null,
    }
    const colRef = doc(db, 'users', uid)
    setDoc(colRef, data)
  }
  return result.user
}
export const login = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  const uid = result.user.uid
  const id = await result.user.getIdToken()
  await fetch('/api/auth/user/session', { method: 'POST', body: JSON.stringify({ id }) })
  const user = getDoc(doc(db, 'users', uid)).then((doc) => {
    return doc.data()
  })
  return user
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
  await fetch('/api/auth/user/logout', { method: 'POST' })
  // await signOut(auth)
  //   .then(() => {
  //     alert('ログアウトが成功しました')
  //   })
  //   .catch((err) => {
  //     alert('ログアウトに失敗しました')
  //     console.log(err)
  //   })
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
  const colRef = doc(db, 'images', uid)
  srcs = Object.assign([], srcs)
  srcs.push(src)
  const data = {
    uid: uid,
    src: srcs,
  }
  await setDoc(colRef, data)
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
type FavoriteObj = {
  name: string
  src: string
}
export const setFirstFavorite = async (uid: string, data: FavoriteObj) => {
  const ref = doc(db, 'users', uid)
  await setDoc(ref, { first_favorite: data }, { merge: true })
  return data
}
export const setFavorite = async (
  uid: string,
  data: FavoriteObj,
  selectData: FavoriteObj,
  favorite: FavoriteObj[],
) => {
  const ref = doc(db, 'users', uid)
  const index = favorite.findIndex((name) => name.name == selectData.name)
  const newFavorite = [...favorite]
  newFavorite.splice(index, 1, data)
  await setDoc(ref, { favorite: newFavorite }, { merge: true })
  return newFavorite
}

type SavePhotoProps = {
  uid: string
  file: File
  url: string
  title: string
  tag: string[]
}
export const createPhotoStorage = async ({ uid, file, url, title, tag }: SavePhotoProps) => {
  const hashName = Math.random().toString(36).slice(-8)
  const ext = file.name.split('.').pop()
  const imageRef = ref(storage, `images/${uid}/${hashName}.${ext}`)
  await uploadString(imageRef, url, 'data_url')
  url = await getDownloadURL(imageRef)
  const timestamp = Timestamp.now()
  const newCityRef = doc(collection(db, 'community'))
  const data: Community = {
    id: newCityRef.id,
    uid: uid,
    title: title,
    tag: tag,
    created_at: timestamp,
    updated_at: timestamp,
    url: url,
  }
  await setDoc(newCityRef, data)
  return data
}
