import { SxProps, Theme } from '@mui/material'

export const searchContainerStyles: SxProps<Theme> = {
  position: 'relative',
}

export const autocompleteStyles = (width?: string): SxProps<Theme> => ({
  width: width,
})

export const getPaperStyles = (
  marginTop?: string,
  paperHeight?: string
): SxProps<Theme> => ({
  marginTop: marginTop,
  borderRadius: '20px',
  padding: '10px 10px 10px 10px',
  height: paperHeight,
  boxShadow: '0 4px 20px var(--blue-light-color)',
  '& .MuiAutocomplete-option': {
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'var(--blue-bright-color) !important',
      color: 'white',
    },
  },
})

export const getListboxStyles = (
  overflow?: string,
  paperHeight?: string
): SxProps<Theme> => ({
  paddingRight: '10px',
  height: paperHeight,
  overflow: overflow,
})

export const popupIndicatorStyles: SxProps<Theme> = {
  display: 'none',
}

export const clearIndicatorStyles: SxProps<Theme> = {
  color: 'var(--main-color)',
  '&:hover': {
    backgroundColor: 'rgba(43, 76, 126, 0.1)',
  },
}

export const textFieldStyles: SxProps<Theme> = {
  borderRadius: '10px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    '& fieldset': {
      border: '1px solid var(--blue-light-color)',
      transition: 'border-color 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'var(--main-color)',
      borderWidth: '1px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--main-color)',
      borderWidth: '1px',
    },
  },
  '& .MuiInputBase-root': {
    color: 'var(--main-color)',
    height: 48,
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  '& .MuiOutlinedInput-input': {
    height: '100%',
    margin: 0,
    lineHeight: '48px',
  },
  '& .MuiInputLabel-root': {
    lineHeight: 1,
    color: 'var(--main-color)',
    '&.Mui-focused': {
      color: 'var(--main-color)',
    },
  },
}

export const noResultsOptionStyles = {
  color: 'var(--blue-color)',
  cursor: 'default' as const,
  textAlign: 'center' as const,
  pointerEvents: 'none' as const,
}

export const highlightedTextStyles = {
  color: 'inherit',
}
