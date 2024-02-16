import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../slice/listSlice';

export const store = configureStore({
  reducer: {
    postList: listReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
