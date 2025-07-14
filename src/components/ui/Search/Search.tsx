import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/joy/Autocomplete'
import Stack from '@mui/joy/Stack'
import { Typography } from '@mui/material'
import { useState } from 'react'
import './style.css'

export default function AutocompleteDecorators() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Stack spacing={2}>
      <Autocomplete
        sx={{ width: 300 }}
        startDecorator={isFocused ? null : <SearchIcon />}
        placeholder={isFocused ? '' : 'Пошук'}
        options={top100Films}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        noOptionsText={
          <Typography sx={{ p: 1 }}>
            Нічого не знайдено <ReportGmailerrorredIcon />
          </Typography>
        }
      />
    </Stack>
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
