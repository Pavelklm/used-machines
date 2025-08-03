import { createSlice } from '@reduxjs/toolkit'

const scrollSlice = createSlice({
  name: 'scroll',
  initialState: { 
    scrollToCatalog: false,
    scrollToForm: false 
  },
  reducers: {
    triggerScrollToCatalog(state) {
      state.scrollToCatalog = true
    },
    resetScrollToCatalog(state) {
      state.scrollToCatalog = false
    },
    triggerScrollToForm(state) {
      state.scrollToForm = true
    },
    resetScrollToForm(state) {
      state.scrollToForm = false
    },
  },
})

export const { 
  triggerScrollToCatalog, 
  resetScrollToCatalog,
  triggerScrollToForm,
  resetScrollToForm 
} = scrollSlice.actions
export default scrollSlice.reducer
