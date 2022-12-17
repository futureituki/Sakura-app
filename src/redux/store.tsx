import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { persistedReducer } from '@/redux/reducers'

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
