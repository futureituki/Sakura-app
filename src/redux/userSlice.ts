import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'
import { login, logout, saveBookmark, signUp } from '@/firebase/firestore'
import { User } from '@/types/user'

type TypeLogin = {
  email: string
  password: string
}
export const userLogin = createAsyncThunk('login', async (userInfo: TypeLogin): Promise<any> => {
  const user = await login(userInfo.email, userInfo.password)
  return user
})
export const userSignUp = createAsyncThunk(
  'signUp',
  async (userInfo: { username: string; email: string; password: string }): Promise<any> => {
    const email = userInfo.email
    const password = userInfo.password
    const username = userInfo.username
    const user = await signUp(username, email, password)
    const timestamp = Timestamp.now()
    const memberInfo: User = {
      uid: user.uid,
      username: username,
      email: user.email,
      password: password,
      created_at: timestamp,
      updated_at: timestamp,
      favorite: [],
      first_favorite: null,
    }
    return memberInfo
  },
)
type bookmark = {
  id: string
  first_favorite: { [s: string]: string }
}
export const userSaveBookmark = createAsyncThunk(
  'bookmark',
  async (userInfo: bookmark): Promise<any> => {
    const bookmark = await saveBookmark(userInfo.id, userInfo.first_favorite)
    return bookmark
  },
)
export const userLogout = createAsyncThunk('logout', async () => {
  await logout()
})
const initialState: User = {
  uid: '',
  username: '',
  email: '',
  password: '',
  created_at: null,
  updated_at: null,
  favorite: [],
  first_favorite: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state: User, action: PayloadAction<User>) => {
      if (action.payload) {
        state.uid = action.payload.uid
        state.username = action.payload.username
        state.email = action.payload.email
        state.password = action.payload.password
        state.created_at = action.payload.created_at.seconds
        state.updated_at = action.payload.updated_at.seconds
        state.favorite = action.payload.favorite
        state.first_favorite = action.payload.first_favorite
      }
    })
    builder.addCase(userSignUp.fulfilled, (state: User, action: PayloadAction<User>) => {
      state.uid = action.payload.uid
      state.username = action.payload.username
      state.email = action.payload.email
      state.password = action.payload.password
      state.created_at = action.payload.created_at
      state.updated_at = action.payload.updated_at
      state.favorite = action.payload.favorite
      state.first_favorite = action.payload.first_favorite
    })
    builder.addCase(
      userSaveBookmark.fulfilled,
      (state, action: PayloadAction<{ [s: string]: string }>) => {
        console.log(action.payload)
        state.first_favorite = action.payload as any
      },
    )
    builder.addCase(userLogout.fulfilled, (state) => {
      state.uid = ''
      state.username = ''
      state.email = ''
      state.password = ''
      state.created_at = null
      state.updated_at = null
      state.favorite = []
      state.first_favorite = []
    })
  },
})
export default userSlice.reducer
