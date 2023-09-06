import { configureStore } from '@reduxjs/toolkit'
import { characterSlice } from './slice'

export const store = configureStore({
  reducer: {
    characters: characterSlice.reducer,
  },
})
