export const TAB_CONTENT_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '800px',
} as const

export const TAB_PANEL_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  p: '40px',
  borderRadius: '20px',
  border: '1px solid rgb(178, 200, 227)',
  transition: 'all 0.3s ease',
  marginBottom: '150px',
} as const

export const TAB_PANEL_STYLES_SPACE_BETWEEN = {
  ...TAB_PANEL_STYLES,
  justifyContent: 'space-between',
} as const

export const TAB_NAVIGATION_STYLES = {
  display: 'flex',
  mb: '40px',
  width: '480px',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  height: '75px',
  position: 'relative',
  gap: '10px',
  zIndex: 5,
  overflow: 'visible',
} as const
