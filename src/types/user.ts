import firebase from 'firebase/compat'

export type User = {
  uid: string
  username: string
  email: string
  password: string
  created_at: any | null
  updated_at: any | null
  favorite: {
    name: string
    src: string
  }[]
  first_favorite: Object | null
}
export type UserReducer = {
  uid: string
  username: string
  email: string
  created_at: any | null
  updated_at: any | null
  favorite: {
    name: string
    src: string
  }[]
  first_favorite: {
    name: string
    src: string
  }
}
