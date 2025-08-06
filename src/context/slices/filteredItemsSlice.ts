import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredItems: [],
  category: '',
  activeEquipment: '',
  activeScroll: false,
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
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setActiveEquipment: (state, action) => {
      state.activeEquipment = action.payload
    },
    setActiveScroll: (state, action) => {
      state.activeScroll = action.payload
    },
  },
})

export const {
  setFilteredItems,
  clearFilteredItems,
  setCategory,
  setActiveEquipment,
  setActiveScroll,
} = filteredItemsSlice.actions
export default filteredItemsSlice.reducer
