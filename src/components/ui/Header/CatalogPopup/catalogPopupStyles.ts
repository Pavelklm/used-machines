import { SxProps, Theme } from '@mui/material'

export const catalogPopupContainerStyles: SxProps<Theme> = {
  display: 'inline-block',
  borderRadius: '10px',
  width: '195px',
}

export const getCatalogButtonStyles = (menuOpen: boolean): SxProps<Theme> => ({
  backgroundColor: menuOpen
    ? 'var(--blue-bright1-color) !important'
    : 'var(--main-color) !important',
  borderRadius: '10px',
  p: '13.5px 30px',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'var(--blue-bright-color) !important',
  },
})

export const catalogButtonTextStyles: SxProps<Theme> = {
  flexGrow: 1,
}

export const popupContainerStyles = {
  position: 'absolute' as const,
  top: '75px',
  left: 20,
  width: 'fit-content',
  marginTop: 5,
  border: '1px solid var(--blue-light-color)',
  borderRadius: '20px',
  zIndex: 500,
}

export const paperStyles: SxProps<Theme> = {
  p: '30px 30px 12px 30px',
  minWidth: 400,
  borderRadius: '20px',
}

export const mainContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  zIndex: 500,
}

export const leftColumnStyles: SxProps<Theme> = {
  minWidth: 309,
  borderRight: '1px solid rgb(178, 200, 227)',
}

export const leftColumnListStyles: SxProps<Theme> = {
  mr: '20px',
}

export const getCategoryItemStyles = (isActive: boolean): SxProps<Theme> => ({
  zIndex: 500,
  backgroundColor: isActive
    ? 'var(--main-color) !important'
    : '#fff !important',
  color: isActive ? '#fff' : '#000',
  borderRadius: '10px',
  p: '16px',
  '&:hover': {
    backgroundColor: 'var(--blue-bright-color) !important',
    color: '#fff',
    '& .MuiSvgIcon-root': {
      color: '#fff',
    },
  },
})

export const categoryItemTextStyles: SxProps<Theme> = {
  width: '200px',
}

export const getCategoryIconStyles = (isActive: boolean): SxProps<Theme> => ({
  color: isActive ? '#fff' : 'var(--black-color)',
})

export const rightColumnStyles: SxProps<Theme> = {
  zIndex: 500,
  width: 289,
  ml: '20px',
  overflow: 'auto',
  overflowX: 'hidden',
  height: '400px',
}

export const equipmentListStyles = {
  listStyle: 'none' as const,
  margin: 0,
  padding: 0,
}

export const equipmentItemStyles: SxProps<Theme> = {
  p: '12px 16px',
  borderRadius: '10px',
  marginRight: '10px',
  zIndex: 500,
  '&:hover': {
    backgroundColor: 'var(--blue-bright-color) !important',
    color: '#fff',
  },
}