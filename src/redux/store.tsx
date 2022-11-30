import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/redux/reducers'
import userReducer from '@/redux/userSlice'
export const store = configureStore({
  reducer: {
    user: rootReducer,
  },
})

export type AppDispatch = typeof store.dispatch
