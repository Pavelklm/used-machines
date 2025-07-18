import { allItems } from '@/varibles/cards'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Box,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const itemNamesByCategory = Object.fromEntries(
  Object.entries(allItems).map(([category, items]) => [
    category,
    items.map((item) => item.name),
  ])
)

type Keys = keyof typeof itemNamesByCategory

const listVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { when: 'afterChildren', duration: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.1 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.1 } },
}

export const CatalogPopup = () => {
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
            color: '#fff ',
            '&:hover': {
              backgroundColor: 'var(--blue-bright-color) !important',
            },
          }}
        >
          <Typography sx={{ flexGrow: 1 }}>Каталог</Typography>
          <motion.div
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <KeyboardArrowDownIcon sx={{ display: 'flex' }} />
          </motion.div>
        </ListItemButton>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 20,
                zIndex: 10,
                width: 'fit-content',
                marginTop: 5,
              }}
            >
              <Paper
                sx={{
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
                      {(Object.keys(itemNamesByCategory) as Keys[]).map(
                        (key) => (
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
                              '&:hover': {
                                backgroundColor:
                                  'var(--blue-bright-color) !important',
                              },
                            }}
                          >
                            <ListItemText primary={key} />
                            <motion.div
                              animate={{
                                rotate: activeItem === key ? 90 : 270,
                              }}
                              transition={{ type: 'spring', stiffness: 100 }}
                            >
                              <KeyboardArrowDownIcon
                                sx={{
                                  color:
                                    activeItem === key
                                      ? '#fff'
                                      : 'var(--black-color)',
                                }}
                              />
                            </motion.div>
                          </ListItemButton>
                        )
                      )}
                    </List>
                  </Box>

                  {/* Правая колонка */}
                  <Box sx={{ minWidth: 289, ml: '20px' }}>
                    <AnimatePresence mode='sync'>
                      {activeItem && (
                        <motion.ul
                          key={activeItem}
                          variants={listVariants}
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          style={{ listStyle: 'none', margin: 0, padding: 0 }}
                        >
                          {itemNamesByCategory[activeItem].map((item) => (
                            <motion.li key={item} variants={itemVariants}>
                              <ListItemButton
                                sx={{ p: '12px 16px ', borderRadius: '10px' }}
                              >
                                <ListItemText primary={item} />
                              </ListItemButton>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ClickAwayListener>
  )
}

export default CatalogPopup
