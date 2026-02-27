import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  username?: string
  isAuthenticated: boolean
  idToken?: string
}

const initialState: AuthState = {
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ username: string; idToken?: string }>) {
      state.username = action.payload.username
      state.isAuthenticated = true
      state.idToken = action.payload.idToken
    },
    clearAuth(state) {
      state.username = undefined
      state.isAuthenticated = false
      state.idToken = undefined
    }
  }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
