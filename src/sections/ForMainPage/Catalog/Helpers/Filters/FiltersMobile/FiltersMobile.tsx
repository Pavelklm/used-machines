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
import { useFiltersMobile } from './useFiltersMobile'
import {
  filtersMobileContainerStyles,
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
  getShowAllProductsStyles,
} from './filtersMobileStyles'
import {
  listVariants,
  itemVariants,
  popupVariants,
  popupTransition,
  arrowRotateTransition,
  categoryArrowTransition,
} from './filtersMobileAnimations'
import { type FilteredItem } from '@/context/slices/filteredItemsSlice'

interface FiltersMobileProps {
  catalogDataByCategory: Record<string, string[]>
  getFilteredProducts: (name: string) => FilteredItem[]
  setFilteredItems: (items: FilteredItem[]) => void
  onShowAllProducts?: () => void
}

export const FiltersMobile = ({
  catalogDataByCategory,
  getFilteredProducts,
  setFilteredItems,
  onShowAllProducts,
}: FiltersMobileProps) => {
  const {
    menuOpen,
    filterState,
    ALL_PRODUCTS,
    handleClickAway,
    handleMainClick,
    handleItemClick,
    handleClick,
    handleShowAllProducts,
  } = useFiltersMobile({
    catalogDataByCategory,
    getFilteredProducts,
    setFilteredItems,
    onShowAllProducts,
  })

  type Keys = keyof typeof catalogDataByCategory

  return (
    <Box sx={filtersMobileContainerStyles}>
      {/* Кнопка "Каталог" */}
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

      {/* Popup с фильтрами */}
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
                  {/* Левая колонка - категории */}
                  <Box sx={leftColumnStyles}>
                    {/* Кнопка "Уся продукція" */}
                    <Typography
                      onClick={handleShowAllProducts}
                      sx={getShowAllProductsStyles(filterState.selectedItem === ALL_PRODUCTS)}
                    >
                      {ALL_PRODUCTS}
                    </Typography>

                    <List sx={leftColumnListStyles}>
                      {(Object.keys(catalogDataByCategory) as Keys[]).map((key) => (
                        <ListItemButton
                          key={key}
                          onClick={() => handleItemClick(key)}
                          selected={filterState.activeCategory === key}
                          sx={getCategoryItemStyles(filterState.activeCategory === key)}
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
                              rotate: filterState.activeCategory === key ? 90 : 270,
                            }}
                            transition={categoryArrowTransition}
                          >
                            <KeyboardArrowDownIcon
                              sx={getCategoryIconStyles(filterState.activeCategory === key)}
                            />
                          </motion.div>
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>

                  {/* Правая колонка - оборудование */}
                  <Box sx={rightColumnStyles}>
                    <AnimatePresence mode='sync'>
                      {filterState.activeCategory && (
                        <motion.ul
                          key={filterState.activeCategory}
                          variants={listVariants}
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          style={equipmentListStyles}
                        >
                          {catalogDataByCategory[filterState.activeCategory]?.map(
                            (item: string) => (
                              <motion.li key={item} variants={itemVariants}>
                                <ListItemButton
                                  onClick={() => handleClick(item)}
                                  selected={filterState.selectedItem === item}
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

export default FiltersMobile
