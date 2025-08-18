import { configureStore } from '@reduxjs/toolkit'
import filteredItemsSlice from './slices/filteredItemsSlice'
import overlaySlice from './slices/overlaySlice'
import scrollSlice from './slices/scrollSlice'
import screenSizeSlice from './slices/screenSizeSlice'

export const store = configureStore({
  reducer: {
    filteredItems: filteredItemsSlice,
    scroll: scrollSlice,
    overlay: overlaySlice,
    screenSize: screenSizeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
