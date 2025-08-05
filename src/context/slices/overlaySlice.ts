import { createSlice } from '@reduxjs/toolkit'

interface OverlayState {
  isOpen: boolean
  source: 'catalog' | 'search' | null
}

const initialState: OverlayState = {
  isOpen: false,
  source: null,
}

const overlay = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.isOpen = action.payload
        if (!action.payload) {
          state.source = null
        }
      } else {
        state.isOpen = action.payload.isOpen
        state.source = action.payload.source
      }
    },
    setCatalogOverlay: (state, action) => {
      state.isOpen = action.payload
      state.source = action.payload ? 'catalog' : null
    },
    setSearchOverlay: (state, action) => {
      state.isOpen = action.payload
      state.source = action.payload ? 'search' : null
    },
  },
})

export const { setOverlay, setCatalogOverlay, setSearchOverlay } =
  overlay.actions
export default overlay.reducer
