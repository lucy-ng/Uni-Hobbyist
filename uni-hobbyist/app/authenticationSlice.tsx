/*
Dan Abramov and the Redux documentation authors, 2024. 
Redux Toolkit Quick Start [Online] 
Available at: https://redux-toolkit.js.org/tutorials/quick-start
[Accessed 24 March 2024]. 
*/

import { createSlice } from '@reduxjs/toolkit'

// Global state for app to see if the user has logged in or not
export interface AuthenticationState {
  isLoggedIn: boolean
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
}

// Processes action and updates state based on action
export const authenticationSlice = createSlice({
  name: 'isLoggedIn',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = authenticationSlice.actions

export default authenticationSlice.reducer