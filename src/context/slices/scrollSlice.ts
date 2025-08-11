import { createSlice } from '@reduxjs/toolkit'

// Типизируем состояние scroll
interface ScrollState {
  scrollToCatalog: boolean
  scrollToForm: boolean
}

// Типизированное начальное состояние
const initialState: ScrollState = { 
  scrollToCatalog: false,
  scrollToForm: false 
}

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
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

// Экспортируем тип для использования
export type { ScrollState }

export default scrollSlice.reducer
