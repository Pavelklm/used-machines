import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredItems: [],
}

export const filteredItemsSlice = createSlice({
  name: 'filteredItems',
  initialState,
  reducers: {
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload
    },
    clearFilteredItems: (state) => {
      state.filteredItems = []
    },
  },
})

export const { setFilteredItems, clearFilteredItems } =
  filteredItemsSlice.actions
export default filteredItemsSlice.reducer
