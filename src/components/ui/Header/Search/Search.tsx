import { setSearchOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import { useProducts } from '@/scripts/hooks/useProducts'
import { Autocomplete, Box, TextField } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchOption {
  id: string
  label: string
}

interface HighlightPart {
  text: string
  highlight: boolean
}

export default function Search() {
  const { productsArray } = useProducts()
  const loading = useAppSelector((state) => state.products.loading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const options = useMemo(
    () =>
      productsArray.map((item) => ({
        id: String(item.id),
        label: item.product_name,
      })),
    [productsArray]
  )

  const hasInput = inputValue.length > 0

  const highlightText = useCallback(
    (text: string, query: string): HighlightPart[] => {
      if (!query) return [{ text, highlight: false }]

      const matchIndex = text.toLowerCase().indexOf(query.toLowerCase())
      if (matchIndex === -1) return [{ text, highlight: false }]

      const before = text.slice(0, matchIndex)
      const match = text.slice(matchIndex, matchIndex + query.length)
      const after = text.slice(matchIndex + query.length)

      const parts: HighlightPart[] = []
      if (before) parts.push({ text: before, highlight: false })
      parts.push({ text: match, highlight: true })
      if (after) parts.push({ text: after, highlight: false })

      return parts
    },
    []
  )

  const handleChange = useCallback(
    (_: any, value: SearchOption | null) => {
      if (value?.id) {
        setIsNavigating(true)

        setOpen(false)
        dispatch(setSearchOverlay(false))

        setInputValue('')

        navigate(`/product/${value.id}`)

        setTimeout(() => {
          setIsNavigating(false)
        }, 100)
      }
    },
    [navigate, dispatch]
  )

  const handleInputChange = useCallback(
    (_: any, newInputValue: string) => {
      setInputValue(newInputValue)

      if (isNavigating) {
        return
      }

      if (newInputValue.length > 0) {
        setOpen(true)
        dispatch(setSearchOverlay(true))
      } else {
        setOpen(false)
        dispatch(setSearchOverlay(false))
      }
    },
    [dispatch, isNavigating]
  )

  const handleOpen = useCallback(() => {
    if (isNavigating) {
      return
    }

    if (!hasInput) {
      return
    }
    setOpen(true)
    dispatch(setSearchOverlay(true))
  }, [dispatch, hasInput, isNavigating])

  const handleClose = useCallback(() => {
    setOpen(false)
    dispatch(setSearchOverlay(false))
  }, [dispatch])

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Autocomplete
        disablePortal={true}
        clearOnEscape={true}
        open={open}
        options={hasInput ? options : []}
        getOptionLabel={(option) => option.label}
        loading={loading && hasInput}
        noOptionsText={hasInput ? 'Нічого не знайдено' : ''}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        loadingText='Завантаження...'
        sx={{ width: 300 }}
        slotProps={{
          paper: {
            sx: {
              marginTop: '31px',
              borderRadius: '20px',
              boxShadow: '0 4px 20px var(--blue-light-color)',
              zIndex: 1003,
              '& .MuiAutocomplete-option': {
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: 'var(--blue-bright-color) !important',
                  color: 'white',
                },
              },
            },
          },
          popupIndicator: {
            sx: {
              display: 'none',
            },
          },
          clearIndicator: {
            sx: {
              color: 'var(--main-color)',
              '&:hover': {
                backgroundColor: 'rgba(43, 76, 126, 0.1)',
              },
            },
          },
        }}
        renderOption={(props, option) => {
          const { key, ...rest } = props
          const highlightedParts = highlightText(option.label, inputValue)

          return (
            <li key={key} {...rest}>
              {highlightedParts.map((part, index) =>
                part.highlight ? (
                  <strong key={index} style={{ color: 'inherit' }}>
                    {part.text}
                  </strong>
                ) : (
                  <span key={index}>{part.text}</span>
                )
              )}
            </li>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Пошук'
            variant='outlined'
            sx={{
              borderRadius: '10px',
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
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
            }}
          />
        )}
      />
    </Box>
  )
}
