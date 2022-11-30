import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'
import { auth } from '@/firebase/firebase'
import { login, signUp } from '@/firebase/firestore'
import { User } from '@/types/user'

type TypeLogin = {
  email:string,
  password:string
}
export const userLogin = createAsyncThunk(
  'login',
  async (userInfo:TypeLogin): Promise<any> => {
    const user = await login(userInfo.email, userInfo.password)
    return user
  },
)
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
  extraReducers: {
    [userLogin.fulfilled]: (state: User, action: PayloadAction<User>) => {
      console.log(state)
      state.uid = action.payload.uid
      state.username = action.payload.username
      state.email = action.payload.email
      state.password = action.payload.password
      state.created_at = action.payload.created_at.seconds
      state.updated_at = action.payload.updated_at.seconds
      state.favorite = action.payload.favorite
    },
    [userSignUp.fulfilled]: (state: User, action: PayloadAction<User>) => {
      state.uid = action.payload.uid
      state.username = action.payload.username
      state.email = action.payload.email
      state.password = action.payload.password
      state.created_at = action.payload.created_at
      state.updated_at = action.payload.updated_at
      state.favorite = action.payload.favorite
    },
  },
})

export default userSlice.reducer
