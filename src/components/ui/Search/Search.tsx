import { Autocomplete, TextField } from '@mui/material'

export default function Search() {
  return (
    <Autocomplete
      options={top100Films}
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

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
]
