// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      // state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      localStorage.setItem('userRole', action.payload.role)
      localStorage.setItem('userData', JSON.stringify(action.payload.data))
      localStorage.setItem("accessToken", action.payload.accessToken)
    },
    handleLogout: state => {
      state.userData = {}
      // state[config.storageTokenKeyName] = null
      // state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userRole")
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
