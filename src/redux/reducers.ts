import { combineReducers } from '@reduxjs/toolkit'
import { imagesSlice } from '@/redux/imageSlice'
import { userSlice } from '@/redux/userSlice'

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  images: imagesSlice.reducer,
})
