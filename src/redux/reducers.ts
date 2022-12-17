import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { imagesSlice } from '@/redux/imageSlice'
import { userSlice } from '@/redux/userSlice'

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  images: imagesSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
