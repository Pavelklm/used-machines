import { createSlice } from '@reduxjs/toolkit'

const scrollSlice = createSlice({
  name: 'scroll',
  initialState: { scrollToCatalog: false },
  reducers: {
    triggerScrollToCatalog(state) {
      state.scrollToCatalog = true
    },
    resetScrollToCatalog(state) {
      state.scrollToCatalog = false
    },
  },
})

export const { triggerScrollToCatalog, resetScrollToCatalog } =
  scrollSlice.actions
export default scrollSlice.reducer
