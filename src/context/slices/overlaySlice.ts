import { createSlice } from '@reduxjs/toolkit'

const overlay = createSlice({
  name: 'overlay',
  initialState: false,
  reducers: {
    setOverlay: (_state, action) => action.payload,
  },
})

export const { setOverlay } = overlay.actions
export default overlay.reducer
