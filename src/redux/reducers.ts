import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from '@/redux/userSlice'
import { imagesSlice } from '@/redux/imageSlice'

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  images: imagesSlice.reducer,
})

