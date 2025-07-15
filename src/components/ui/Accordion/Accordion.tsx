import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Box,
  ClickAwayListener,
  Grow,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import './style.css'

type Keys = 'Компонент1' | 'Компонент2' | 'Компонент3'

const nestedData: Record<Keys, string[]> = {
  Компонент1: ['Куттер', 'Вовчок'],
  Компонент2: ['Емульсатори', 'Фаршемішалки'],
  Компонент3: ['Блокорізки', 'Сепаратори', 'Міксери'],
}

export const CustomAccordion = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<Keys | null>(null)

  const handleClickAway = () => {
    setMenuOpen(false)
    setActiveItem(null)
  }

  const handleMainClick = () => {
    setMenuOpen((prev) => !prev)
    if (menuOpen) setActiveItem(null)
  }

  const handleItemClick = (key: Keys) => {
    setActiveItem((prev) => (prev === key ? null : key))
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{ display: 'inline-block', borderRadius: '10px', width: '195px' }}
      >
        <ListItemButton
          onClick={handleMainClick}
          sx={{
            backgroundColor: menuOpen
              ? 'var(--blue-bright1-color) !important'
              : 'var(--main-color) !important',
            borderRadius: '10px',
            p: '13.5px 30px',
          }}
        >
          <Typography sx={{ flexGrow: 1 }}>Каталог</Typography>
          <KeyboardArrowDownIcon
            sx={{
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </ListItemButton>

        <Grow className='grow-accordion' in={menuOpen} timeout={200}>
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 20,
              zIndex: 10,
              mt: '5px',
              p: '30px 30px 12px 30px',
              minWidth: 400,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box
                sx={{
                  minWidth: 309,
                  borderRight: '1px solid rgb(178, 200, 227)',
                }}
              >
                <List sx={{ mr: '20px' }}>
                  {(Object.keys(nestedData) as Keys[]).map((key) => (
                    <ListItemButton
                      key={key}
                      onClick={() => handleItemClick(key)}
                      selected={activeItem === key}
                      sx={{
                        backgroundColor:
                          activeItem === key
                            ? 'var(--main-color) !important'
                            : '#fff !important',
                        color: activeItem === key ? '#fff' : '#000',
                        borderRadius: '10px',
                        p: '16px',
                      }}
                    >
                      <ListItemText primary={key} />
                      <KeyboardArrowDownIcon
                        sx={{
                          transition: 'transform 0.3s ease',
                          transform:
                            activeItem === key
                              ? 'rotate(90deg)'
                              : 'rotate(270deg)',
                          color: 'var(--black-color)',
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>

              <Box sx={{ minWidth: 289, ml: '20px' }}>
                <Grow in={!!activeItem}>
                  <Box>
                    {activeItem && (
                      <List>
                        {nestedData[activeItem].map((item) => (
                          <ListItemButton
                            key={item}
                            sx={{ p: '12px 16px ', borderRadius: '10px' }}
                          >
                            <ListItemText primary={item} />
                          </ListItemButton>
                        ))}
                      </List>
                    )}
                  </Box>
                </Grow>
              </Box>
            </Box>
          </Paper>
        </Grow>
      </Box>
    </ClickAwayListener>
  )
}

export default CustomAccordion
