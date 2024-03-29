/*
Dan Abramov and the Redux documentation authors, 2024. 
Redux Toolkit TypeScript Quick Start [Online] 
Available at: https://redux-toolkit.js.org/tutorials/typescript
[Accessed 29 March 2024]. 
*/

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector