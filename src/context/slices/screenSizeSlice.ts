import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const BREAKPOINTS = {
  miniPhone: 320,
  phone: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1256,
} as const

type ScreenSize = 'miniPhone' | 'phone' | 'tablet' | 'laptop' | 'desktop'

interface ScreenSizeState {
  width: number
  screenSize: ScreenSize
  isMiniPhone: boolean
  isPhone: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
}

const getScreenSize = (width: number): ScreenSize => {
  if (width > BREAKPOINTS.laptop) return 'desktop'
  if (width > BREAKPOINTS.tablet) return 'laptop'
  if (width > BREAKPOINTS.phone) return 'tablet'
  if (width > BREAKPOINTS.miniPhone) return 'phone'
  return 'miniPhone'
}

const createStateFromWidth = (width: number): ScreenSizeState => {
  const screenSize = getScreenSize(width)

  return {
    width,
    screenSize,
    isMiniPhone: width <= BREAKPOINTS.miniPhone,
    isPhone: width <= BREAKPOINTS.phone,
    isTablet: width <= BREAKPOINTS.tablet,
    isLaptop: width <= BREAKPOINTS.laptop,
    isDesktop: width >= BREAKPOINTS.desktop,
  }
}

const initialState: ScreenSizeState = createStateFromWidth(
  typeof window !== 'undefined' ? window.innerWidth : 1200
)

const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    updateScreenSize: (state, action: PayloadAction<number>) => {
      const newState = createStateFromWidth(action.payload)
      Object.assign(state, newState)
    },
  },
})

export const { updateScreenSize } = screenSizeSlice.actions
export { BREAKPOINTS }
export default screenSizeSlice.reducer
