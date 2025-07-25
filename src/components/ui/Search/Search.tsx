import { Autocomplete, TextField } from '@mui/material'

const allItems = {
  Виробники: [
    { name: 'Виробник 1' },
    { name: 'Виробник 2' },
    { name: 'Виробник 3' },
    { name: 'Виробник 4' },
  ],
  Категорії: [
    { name: 'Категорія 1' },
    { name: 'Категорія 2' },
    { name: 'Категорія 3' },
    { name: 'Категорія 4' },
  ],
}

export default function Search() {
  const allItemsNames = Object.values(allItems)
    .flat()
    .map((item) => item.name)

  return (
    <Autocomplete
      options={allItemsNames}
      disablePortal
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Пошук'
          variant='outlined'
          sx={{
            '& .MuiInputBase-root': {
              height: 48,
              padding: 0,
              borderRadius: '10px',
              border: '1px solid var(--blue-light-color)',
              '&:hover': {
                border: '1px solid var(--blue-light-color)',
              },
            },
            '& .MuiOutlinedInput-input': {
              height: '100%',
              padding: '0 0 0 20px  !important',
              margin: 0,
              lineHeight: '48px',
            },
            '& .MuiInputLabel-root': {
              lineHeight: 1,
            },
          }}
        />
      )}
    />
  )
}
