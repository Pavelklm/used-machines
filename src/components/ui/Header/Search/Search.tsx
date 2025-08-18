import { setSearchOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
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
  const { productsArray, isLoading } = useProducts()

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

  const filteredOptions = useMemo(() => {
    if (!inputValue) return []

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    if (filtered.length === 0) {
      return [{ id: 'no-results', label: 'Нічого не знайдено' }]
    }

    return filtered
  }, [options, inputValue])

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
    (_: any, value: string | SearchOption | null) => {
      if (value && typeof value === 'object' && 'id' in value) {
        if (value.id === 'no-results') {
          return
        }

        setIsNavigating(true)
        setOpen(false)
        dispatch(setSearchOverlay(false))
        setInputValue('')
        navigate(`/product/${value.id}`)
        setTimeout(() => {
          setIsNavigating(false)
        }, 100)
      }
      if (value === null) {
        setInputValue('')
        setOpen(false)
        dispatch(setSearchOverlay(false))
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
    setInputValue('')
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
        filterOptions={(x) => x}
        open={open}
        options={filteredOptions}
        getOptionLabel={(option) => {
          return typeof option === 'string' ? option : option.label
        }}
        loading={isLoading && hasInput}
        noOptionsText={''}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        inputValue={inputValue}
        freeSolo={true}
        onInputChange={handleInputChange}
        loadingText='Завантаження...'
        sx={{ width: 300 }}
        slotProps={{
          paper: {
            sx: {
              marginTop: '33px',
              borderRadius: '20px',
              padding: '10px 10px 10px 10px',
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
          listbox: {
            sx: {
              paddingRight: '10px',
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

          if (option.id === 'no-results') {
            return (
              <li
                key={key}
                {...rest}
                style={{
                  ...rest.style,
                  color: 'var(--blue-color)',
                  cursor: 'default',
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                {option.label}
              </li>
            )
          }

          const label = typeof option === 'string' ? option : option.label
          const highlightedParts = highlightText(label, inputValue)

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
            }}
          />
        )}
      />
    </Box>
  )
}
