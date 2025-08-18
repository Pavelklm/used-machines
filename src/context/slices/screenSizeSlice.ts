import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const BREAKPOINTS = {
  mobile: 320,
  mobileLandscape: 480, 
  tablet: 768,
  desktop: 1024,
} as const;

type ScreenSize = 'mobile' | 'mobileLandscape' | 'tablet' | 'desktop' | 'large';

interface ScreenSizeState {
  width: number;
  screenSize: ScreenSize;
  isMobile: boolean;
  isMobileLandscape: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  isAboveMobile: boolean;
  isAboveTablet: boolean;
  isAboveDesktop: boolean;
}

const getScreenSize = (width: number): ScreenSize => {
  if (width >= BREAKPOINTS.desktop) return 'large';
  if (width >= BREAKPOINTS.tablet) return 'desktop';
  if (width >= BREAKPOINTS.mobileLandscape) return 'tablet';
  if (width >= BREAKPOINTS.mobile) return 'mobileLandscape';
  return 'mobile';
};

const createStateFromWidth = (width: number): ScreenSizeState => {
  const screenSize = getScreenSize(width);
  
  return {
    width,
    screenSize,
    isMobile: screenSize === 'mobile',
    isMobileLandscape: screenSize === 'mobileLandscape',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isLarge: screenSize === 'large',
    isAboveMobile: width >= BREAKPOINTS.mobileLandscape,
    isAboveTablet: width >= BREAKPOINTS.tablet,
    isAboveDesktop: width >= BREAKPOINTS.desktop,
  };
};

// SSR-friendly начальное состояние
const initialState: ScreenSizeState = createStateFromWidth(
  typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.desktop
);

const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    updateScreenSize: (state, action: PayloadAction<number>) => {
      const newState = createStateFromWidth(action.payload);
      
      // Обновляем все поля
      Object.assign(state, newState);
    },
  },
});

export const { updateScreenSize } = screenSizeSlice.actions;
export { BREAKPOINTS };
export default screenSizeSlice.reducer;