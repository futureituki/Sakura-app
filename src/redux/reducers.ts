import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from '@/redux/userSlice'

export const rootReducer = combineReducers({
  user: userSlice.reducer,
})
