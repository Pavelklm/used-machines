import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, ClickAwayListener, Paper, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

type SorterProps = {
  sortType: string
  onSortChange: (sortType: string) => void
}

const options = [
  { value: 'high', label: 'Ціна від дорогих' },
  { value: 'low', label: 'Ціна від дешевих' },
]

export default function CustomSorter({ sortType, onSortChange }: SorterProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSelect = (value: string) => {
    onSortChange(value)
    setIsOpen(false)
  }

  const handleClickAway = () => {
    setIsOpen(false)
  }

  const selectedOption = options.find((option) => option.value === sortType)

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ width: 204, position: 'relative' }}>
        <Box
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            border: '1px solid var(--blue-light-color)',
            borderRadius: '10px',
            cursor: 'pointer',
            backgroundColor: 'white',
            '&:hover': {
              borderColor: 'var(--main-color)',
            },
          }}
        >
          <Typography sx={{ color: 'var(--main-color)', fontSize: '16px' }}>
            {selectedOption?.label}
          </Typography>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <KeyboardArrowDownIcon sx={{ color: 'var(--main-color)' }} />
          </motion.div>
        </Box>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 9999,
                marginTop: '4px',
              }}
            >
              <Paper
                sx={{
                  border: '1px solid var(--blue-light-color)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
                }}
              >
                {options.map((option) => (
                  <Box
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    sx={{
                      padding: '14px 16px',
                      cursor: 'pointer',
                      backgroundColor:
                        sortType === option.value
                          ? 'var(--main-color)'
                          : 'white',
                      '&:hover': {
                        backgroundColor:
                          sortType === option.value
                            ? 'var(--main-color)'
                            : 'var(--blue-light-color)',
                        '& .MuiTypography-root': {
                          color: 'white',
                        },
                      },
                      '&:not(:last-child)': {
                        borderBottom: '1px solid var(--blue-light-color)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          sortType === option.value
                            ? 'white'
                            : 'var(--main-color)',
                        fontSize: '16px',
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ClickAwayListener>
  )
}
