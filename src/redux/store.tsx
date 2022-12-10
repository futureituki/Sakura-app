import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/redux/reducers'
export const store = configureStore({
  reducer: {
    user: rootReducer,
  },
})

export type AppDispatch = typeof store.dispatch
