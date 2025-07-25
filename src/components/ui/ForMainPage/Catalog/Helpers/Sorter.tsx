import { Product } from '@/types/products'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'

type SorterProps = {
  itemsToSort: Product[]
  setSortedItems: React.Dispatch<React.SetStateAction<any>>
}

export default function Sorter({ itemsToSort, setSortedItems }: SorterProps) {
  const [range, setRange] = React.useState('low')
  console.log(itemsToSort)

  const handleSort = () => {
    const sorted = [...itemsToSort].sort(
      (a, b) => Number(a.price) - Number(b.price)
    )
    if (range === 'low') {
      setSortedItems(sorted)
    } else if (range === 'high') {
      setSortedItems(sorted.reverse())
    } else {
      setSortedItems(itemsToSort)
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setRange(event.target.value as string)
    handleSort()
  }

  React.useEffect(() => {
    handleSort()
  }, [range, itemsToSort])

  return (
    <Box sx={{ width: 204 }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{ color: 'var(--main-color)' }}
          id='demo-simple-select-label'
        >
          Ціна
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={range}
          label='range'
          onChange={handleChange}
          sx={{
            color: 'var(--main-color)',
            borderRadius: '10px',
            '& .MuiBackdrop-root': {
              overflow: 'hidden',
            },
          }}
        >
          <MenuItem sx={{ color: 'var(--main-color)' }} value={'low'}>
            Ціна від дешевих
          </MenuItem>
          <MenuItem sx={{ color: 'var(--main-color)' }} value={'high'}>
            Ціна від дорогих
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
