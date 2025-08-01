import { setOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import { useProducts } from '@/scripts/hooks/useProducts'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import parse from 'html-react-parser'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const { productsArray } = useProducts()
  const loading = useAppSelector((state) => state.products.loading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')

  const options = productsArray.map((item) => ({
    id: item.id,
    label: item.product_name,
  }))

  const hasInput = inputValue.length > 0

  return (
    <Autocomplete
      options={hasInput ? options : []}
      getOptionLabel={(option) => option.label}
      loading={loading && hasInput}
      noOptionsText={hasInput ? 'Нічого не знайдено' : ''}
      onOpen={() => {
        if (hasInput) dispatch(setOverlay(true))
      }}
      onClose={() => dispatch(setOverlay(false))}
      onChange={(_, value) => {
        if (value?.id) {
          navigate(`/product/${value.id}`)
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
        if (newInputValue.length === 0) {
          dispatch(setOverlay(false)) // если очищаем — убираем оверлей
        }
      }}
      disablePortal={false}
      loadingText='Завантаження...'
      sx={{ width: 300 }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '20px',
            boxShadow: '0 4px 20px var(--blue-light-color)',
            '& .MuiAutocomplete-option': {
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: 'var(--blue-bright-color)',
                color: 'white',
              },
            },
          },
        },
      }}
      renderOption={(props, option) => {
        const matchIndex = option.label
          .toLowerCase()
          .indexOf(inputValue.toLowerCase())

        let highlightedLabel = option.label

        if (matchIndex >= 0 && hasInput) {
          const before = option.label.slice(0, matchIndex)
          const match = option.label.slice(
            matchIndex,
            matchIndex + inputValue.length
          )
          const after = option.label.slice(matchIndex + inputValue.length)

          highlightedLabel = `${before}<strong>${match}</strong>${after}`
        }

        return <li {...props}>{parse(highlightedLabel)}</li>
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Пошук'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && hasInput ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
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
              height: 48,
              padding: 0,
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-input': {
              height: '100%',
              padding: '0 0 0 20px !important',
              margin: 0,
              lineHeight: '48px',
            },
            '& .MuiInputLabel-root': {
              lineHeight: 1,
              '&.Mui-focused': {
                color: 'var(--main-color)',
              },
            },
            '& .MuiCircularProgress-root': {
              color: 'var(--main-color)',
              marginRight: '12px',
            },
          }}
        />
      )}
    />
  )
}
