import { SxProps, Theme } from '@mui/material'

export const filtersMobileContainerStyles: SxProps<Theme> = {
  display: 'inline-block',
  borderRadius: '10px',
}

export const getCatalogButtonStyles = (menuOpen: boolean): SxProps<Theme> => ({
  backgroundColor: menuOpen
    ? 'var(--blue-bright1-color) !important'
    : 'var(--main-color) !important',
  borderRadius: '10px',
  p: '13.5px 30px',
  maxHeight: '44px',
  color: '#fff',
  gap: '16px',
  '&:hover': {
    backgroundColor: 'var(--blue-bright-color) !important',
  },
})

export const catalogButtonTextStyles: SxProps<Theme> = {
  flexGrow: 1,
}

export const getPopupContainerStyles = (width: number) => ({
  position: 'absolute' as const,
  right: width < 768 ? 0 : 20,
  width: width < 768 ? '100%' : 'fit-content',
  marginTop: 5,
  border: '1px solid var(--blue-light-color)',
  borderRadius: '20px',
  zIndex: 25,
})

export const getPaperStylesWidth = (width: number): SxProps<Theme> => ({
  p: width < 768 ? '20px' : '30px 30px 12px 30px',
  minWidth: width < 768 ? 'auto' : 400,
  borderRadius: '20px',
  border: '1px solid var(--blue-light-color)',
})

export const mainContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
}

export const leftColumnStyles: SxProps<Theme> = {
  minWidth: 309,
  borderRight: '1px solid rgb(178, 200, 227)',
}

export const leftColumnListStyles: SxProps<Theme> = {
  mr: '20px',
}

// Стили для кнопки "Уся продукція"
export const getShowAllProductsStyles = (
  isSelected: boolean
): SxProps<Theme> => ({
  padding: '16px',
  borderRadius: '10px',
  marginBottom: '10px',
  marginRight: '20px',
  boxShadow: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isSelected ? 'var(--main-color)' : 'transparent',
  color: isSelected ? '#fff' : 'inherit',
  '&:hover': {
    background: 'var(--blue-bright-color)',
    color: '#fff',
  },
})

export const getCategoryItemStyles = (isActive: boolean): SxProps<Theme> => ({
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
  width: 289,
  ml: '20px',
  overflow: 'auto',
  overflowX: 'hidden',
  height: '490px',
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
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'var(--blue-bright-color) !important',
    color: '#fff',
  },
  // Выделение выбранного элемента
  '&.Mui-selected': {
    backgroundColor: 'var(--main-color) !important',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'var(--blue-bright-color) !important',
    },
  },
}
