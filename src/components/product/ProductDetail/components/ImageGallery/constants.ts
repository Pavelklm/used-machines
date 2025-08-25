export const MODAL_SIZES = {
  BASE_WIDTH: 1920,
  BASE_HEIGHT: 830,
  TEXT_FONT_SIZE: 26,
  TEXT_PADDING_VERTICAL: 10,
  TEXT_PADDING_HORIZONTAL: 30,
  TEXT_BORDER_RADIUS: 5,
  THUMBNAIL_SIZE: 83,
  THUMBNAIL_BORDER_RADIUS: 8,
  THUMBNAIL_BORDER_WIDTH: 2,
  BUTTON_SIZE: 40,
  BUTTON_PADDING: 8,
  BUTTON_BORDER_RADIUS: 6,
  BUTTON_BORDER_WIDTH: 1,
  ICON_SIZE: 24,
  IMAGE_BORDER_RADIUS: 12,
  HOVER_TRANSLATE: 2,
  NAVIGATION_GAP: 10,
} as const

export const GALLERY_SETTINGS = {
  MAX_VISIBLE_THUMBNAILS: 3,
} as const

export const NAVIGATION_BUTTON_STYLES = {
  width: '40px',
  height: '40px',
  border: '1px solid var(--blue-light-color)',
  borderRadius: '8px',
  backgroundColor: '#fff',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'var(--blue-bright-color)',
    '& .MuiSvgIcon-root': {
      color: '#fff',
    },
  },
  '&:disabled': { opacity: 0.3 },
} as const

export const MAIN_IMAGE_STYLES = {
  width: {
    xl: '600px',
    lg: '546px',
    md: '648px',
    sm: '440px',
    xs: '320px',
  },
  height: {
    xl: '500px',
    lg: '500px',
    md: '400px',
    sm: '300px',
    xs: '220px',
  },
  borderRadius: '10px',
  boxShadow: '0 0 0 1px var(--blue-light-color)',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  cursor: "url('/icons/Cursor_ZoomIn.svg'), zoom-in",
  position: 'relative',
  '&:hover .main-image': {
    transform: {
      xl: 'scale(1.1)',
      lg: 'none',
      md: 'none',
      sm: 'none',
      xs: 'none',
    },
  },
  '&:hover .zoom-icon': {
    opacity: 1,
  },
} as const
