import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'
import { login, saveBookmark, signUp } from '@/firebase/firestore'
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
    }
    return memberInfo
  },
)
type bookmark = {
  id: string
  favorite: string | Array<string>
}
export const userSaveBookmark = createAsyncThunk(
  'bookmark',
  async (userInfo: bookmark): Promise<any> => {
    const bookmark = await saveBookmark(userInfo.id, userInfo.favorite)
    console.log(bookmark)
    return bookmark
  },
)
const initialState: User = {
  uid: '',
  username: '',
  email: '',
  password: '',
  created_at: null,
  updated_at: null,
  favorite: [],
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
    })
    builder.addCase(userSaveBookmark.fulfilled, (state, action: PayloadAction<[]>) => {
      state.favorite = action.payload
    })
  },
})
export default userSlice.reducer
