export const TAB_CONTENT_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: { xl: '800px', lg: 'auto', md: 'auto', sm: 'auto', xs: 'auto' },
} as const

export const TAB_PANEL_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  p: { xl: '40px', lg: '40px', md: '40px', sm: '40px', xs: '40px' },
  borderRadius: '20px',
  border: '1px solid rgb(178, 200, 227)',
  transition: 'all 0.3s ease',
  marginBottom: '150px',
} as const

export const TAB_PANEL_STYLES_DESCRIPTION = {
  ...TAB_PANEL_STYLES,
  p: { xl: '40px', lg: '40px', md: '40px', sm: '40px', xs: '0' },
  border: {
    xl: '1px solid rgb(178, 200, 227)',
    lg: '1px solid rgb(178, 200, 227)',
    md: '1px solid rgb(178, 200, 227)',
    sm: '1px solid rgb(178, 200, 227)',
    xs: 'none',
  },
} as const

export const TAB_PANEL_STYLES_SPACE_BETWEEN = {
  ...TAB_PANEL_STYLES,
  justifyContent: 'space-between',
} as const

export const TAB_NAVIGATION_STYLES = {
  display: 'flex',
  mb: '40px',
  width: { xl: '480px', lg: '480px', md: '480px', sm: 'auto', xs: 'auto' },
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  height: '75px',
  position: 'relative',
  gap: { xl: '10px', lg: '10px', md: '10px', sm: '10px', xs: '10px' },
  zIndex: 5,
  overflow: 'visible',
} as const
