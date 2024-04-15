/*
Dan Abramov and the Redux documentation authors, 2024. 
Redux Toolkit Quick Start [Online] 
Available at: https://redux-toolkit.js.org/tutorials/quick-start
[Accessed 24 March 2024]. 
*/

import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authenticationSlice'

export const store = configureStore({
  reducer: {
    counter: authenticationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch