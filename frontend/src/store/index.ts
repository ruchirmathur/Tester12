import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { accountsApi } from './services/accountsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [accountsApi.reducerPath]: accountsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
