import { SxProps, Theme } from '@mui/material'

export const getShowAllProductsStyles = (isSelected: boolean): SxProps<Theme> => ({
  padding: '16px',
  borderRadius: '16px',
  marginBottom: '5px',
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

export const getAccordionStyles = (expanded: boolean): SxProps<Theme> => ({
  border: expanded
    ? '1px solid var(--blue-light-color)'
    : '1px solid transparent',
  borderRadius: '16px',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
})

// Стили для главного аккордиона "Каталог" (без бордера)
export const getCatalogMainAccordionStyles = (expanded: boolean): SxProps<Theme> => ({
  border: 'none',
  borderRadius: '16px',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
})

export const accordionSummaryStyles: SxProps<Theme> = {
  padding: '16px',
  borderRadius: '16px',
  paddingBottom: '0px !important',
  minHeight: 0,
  overflow: 'hidden',
}

export const accordionHeaderTextStyles: SxProps<Theme> = {
  margin: 0,
  width: '223px',
}

export const expandIconStyles: SxProps<Theme> = {
  color: 'var(--main-color)',
}

export const accordionDetailsStyles: SxProps<Theme> = {
  margin: 0,
  padding: '0 0 16px 0',
}

export const getListItemStyles = (isSelected: boolean): SxProps<Theme> => ({
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  backgroundColor: isSelected ? 'var(--main-color)' : 'transparent',
  color: isSelected ? '#fff' : 'inherit',
  '&:hover': {
    backgroundColor: 'var(--blue-bright-color)',
    color: '#fff',
  },
})

export const listItemLinkStyles: SxProps<Theme> = {
  display: 'block',
  width: '100%',
  padding: '12px 16px',
}