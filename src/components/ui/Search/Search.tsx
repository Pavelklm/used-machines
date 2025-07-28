import { useAppSelector } from '@/scripts/hooks/hooks'
import { useProducts } from '@/scripts/hooks/useProducts'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'

export default function Search() {
  const { productsArray } = useProducts()
  console.log(productsArray)

  const allItemsNames = productsArray.map((item) => item.product_name)

  const loading = useAppSelector((state) => state.products.loading)

  return (
    <Autocomplete
      options={allItemsNames}
      disablePortal
      loading={loading}
      loadingText='Завантаження...'
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Пошук'
          variant='outlined'
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
          sx={{
            // Стили для обычного состояния
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)', // дефолтный цвет
                transition: 'border-color 0.3s ease',
              },
              // Стили при наведении
              '&:hover fieldset': {
                borderColor: 'var(--main-color)',
                borderWidth: '1px', // можно сделать жирнее для лучшей видимости
              },
              // Стили при фокусе
              '&.Mui-focused fieldset': {
                borderColor: 'var(--main-color)',
                borderWidth: '1px',
              },
            },
            // Остальные стили
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
              // Стили для label при фокусе
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
