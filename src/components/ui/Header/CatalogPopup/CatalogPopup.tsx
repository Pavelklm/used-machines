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
import { useCatalogPopup } from './useCatalogPopup'
import {
  catalogPopupContainerStyles,
  getCatalogButtonStyles,
  catalogButtonTextStyles,
  popupContainerStyles,
  paperStyles,
  mainContentStyles,
  leftColumnStyles,
  leftColumnListStyles,
  getCategoryItemStyles,
  categoryItemTextStyles,
  getCategoryIconStyles,
  rightColumnStyles,
  equipmentListStyles,
  equipmentItemStyles,
} from './catalogPopupStyles'
import {
  listVariants,
  itemVariants,
  popupVariants,
  popupTransition,
  arrowRotateTransition,
  categoryArrowTransition,
} from './catalogPopupAnimations'

export const CatalogPopup = () => {
  const {
    menuOpen,
    activeItem,
    filterOptionsByGroup,
    handleClickAway,
    handleMainClick,
    handleItemClick,
    handleClick,
  } = useCatalogPopup()

  type Keys = keyof typeof filterOptionsByGroup

  return (
    <Box sx={catalogPopupContainerStyles}>
      <ListItemButton
        onClick={handleMainClick}
        sx={getCatalogButtonStyles(menuOpen)}
      >
        <Typography sx={catalogButtonTextStyles}>Каталог</Typography>
        <motion.div
          animate={{ rotate: menuOpen ? 180 : 0 }}
          transition={arrowRotateTransition}
        >
          <KeyboardArrowDownIcon sx={{ display: 'flex' }} />
        </motion.div>
      </ListItemButton>

      <AnimatePresence>
        {menuOpen && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <motion.div
              variants={popupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={popupTransition}
              style={popupContainerStyles}
            >
              <Paper sx={paperStyles}>
                <Box sx={mainContentStyles}>
                  <Box sx={leftColumnStyles}>
                    <List sx={leftColumnListStyles}>
                      {(Object.keys(filterOptionsByGroup) as Keys[]).map(
                        (key) => (
                          <ListItemButton
                            key={key}
                            onClick={() => handleItemClick(key)}
                            selected={activeItem === key}
                            sx={getCategoryItemStyles(activeItem === key)}
                          >
                            <ListItemText
                              primary={key}
                              slotProps={{
                                primary: {
                                  sx: categoryItemTextStyles,
                                },
                              }}
                            />
                            <motion.div
                              animate={{
                                rotate: activeItem === key ? 90 : 270,
                              }}
                              transition={categoryArrowTransition}
                            >
                              <KeyboardArrowDownIcon
                                sx={getCategoryIconStyles(activeItem === key)}
                              />
                            </motion.div>
                          </ListItemButton>
                        )
                      )}
                    </List>
                  </Box>

                  {/* Правая колонка */}
                  <Box sx={rightColumnStyles}>
                    <AnimatePresence mode='sync'>
                      {activeItem && (
                        <motion.ul
                          key={activeItem}
                          variants={listVariants}
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          style={equipmentListStyles}
                        >
                          {filterOptionsByGroup[activeItem]?.map(
                            (item: string) => (
                              <motion.li key={item} variants={itemVariants}>
                                <ListItemButton
                                  onClick={() => handleClick(item)}
                                  sx={equipmentItemStyles}
                                >
                                  <ListItemText primary={item} />
                                </ListItemButton>
                              </motion.li>
                            )
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </ClickAwayListener>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default CatalogPopup