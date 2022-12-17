import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux'
import { rootReducer } from '@/redux/reducers'
import thunk from 'redux-thunk';
import { persistedReducer } from '@/redux/reducers'

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
