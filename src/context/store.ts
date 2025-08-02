import { configureStore } from '@reduxjs/toolkit'
import filteredItemsSlice from './slices/filteredItemsSlice'
import overlaySlice from './slices/overlaySlice'
import productsReducer from './slices/productSlice'
import scrollSlice from './slices/scrollSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filteredItems: filteredItemsSlice,
    scroll: scrollSlice,
    overlay: overlaySlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch