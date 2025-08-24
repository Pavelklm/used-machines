import { type FilteredItem } from '@/context/slices/filteredItemsSlice'
import { useScreenSize } from '@/scripts/hooks/useScreenSize'
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
import Filters from '../Filters'
import {
  arrowRotateTransition,
  categoryArrowTransition,
  itemVariants,
  listVariants,
  popupTransition,
  popupVariants,
} from './filtersMobileAnimations'
import {
  catalogButtonTextStyles,
  categoryItemTextStyles,
  equipmentItemStyles,
  equipmentListStyles,
  filtersMobileContainerStyles,
  getCatalogButtonStyles,
  getCategoryIconStyles,
  getCategoryItemStyles,
  getPaperStylesWidth,
  getPopupContainerStyles,
  getShowAllProductsStyles,
  leftColumnListStyles,
  leftColumnStyles,
  mainContentStyles,
  rightColumnStyles,
} from './filtersMobileStyles'
import { useFiltersMobile } from './useFiltersMobile'

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

  const { isDesktop, width } = useScreenSize()

  type Keys = keyof typeof catalogDataByCategory

  // Определяем, какой компонент показывать в модальном окне
  const shouldShowTwoColumnLayout = width >= 768 && width < 1256
  const shouldShowSimpleFilters = width < 768

  // Обработчик для закрытия попапа после выбора на мобильных
  const handleMobileFilterChange = (items: FilteredItem[]) => {
    setFilteredItems(items)
    if (width < 768) {
      // Закрываем попап только для экранов меньше 768px
      handleClickAway()
    }
  }

  const handleMobileShowAllProducts = () => {
    if (onShowAllProducts) {
      onShowAllProducts()
    }
    if (width < 768) {
      // Закрываем попап только для экранов меньше 768px
      handleClickAway()
    }
  }

  return (
    <Box sx={filtersMobileContainerStyles}>
      {/* Кнопка "Фільтра" */}
      <ListItemButton
        onClick={handleMainClick}
        sx={getCatalogButtonStyles(menuOpen)}
      >
        <Typography sx={catalogButtonTextStyles}>Фільтра</Typography>
        <motion.div
          animate={{ rotate: menuOpen ? 180 : 0 }}
          transition={arrowRotateTransition}
        >
          <KeyboardArrowDownIcon sx={{ display: 'flex' }} />
        </motion.div>
      </ListItemButton>

      {!isDesktop && (
        <AnimatePresence>
          {menuOpen && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <motion.div
                variants={popupVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={popupTransition}
                style={getPopupContainerStyles(width)}
              >
                <Paper sx={getPaperStylesWidth(width)}>
                  {/* Для планшетов (768px-1255px) - старая двухколоночная логика */}
                  {shouldShowTwoColumnLayout && (
                    <Box sx={mainContentStyles}>
                      {/* Левая колонка - категории */}
                      <Box sx={leftColumnStyles}>
                        {/* Кнопка "Уся продукція" */}
                        <Typography
                          onClick={handleShowAllProducts}
                          sx={getShowAllProductsStyles(
                            filterState.selectedItem === ALL_PRODUCTS
                          )}
                        >
                          {ALL_PRODUCTS}
                        </Typography>

                        <List sx={leftColumnListStyles}>
                          {(Object.keys(catalogDataByCategory) as Keys[]).map(
                            (key) => (
                              <ListItemButton
                                key={key}
                                onClick={() => handleItemClick(key)}
                                selected={filterState.activeCategory === key}
                                sx={getCategoryItemStyles(
                                  filterState.activeCategory === key
                                )}
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
                                    rotate:
                                      filterState.activeCategory === key
                                        ? 90
                                        : 270,
                                  }}
                                  transition={categoryArrowTransition}
                                >
                                  <KeyboardArrowDownIcon
                                    sx={getCategoryIconStyles(
                                      filterState.activeCategory === key
                                    )}
                                  />
                                </motion.div>
                              </ListItemButton>
                            )
                          )}
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
                              {catalogDataByCategory[
                                filterState.activeCategory
                              ]?.map((item: string) => (
                                <motion.li key={item} variants={itemVariants}>
                                  <ListItemButton
                                    onClick={() => handleClick(item)}
                                    selected={filterState.selectedItem === item}
                                    sx={equipmentItemStyles}
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
                  )}

                  {/* Для мобильных (<768px) - обычные фильтры */}
                  {shouldShowSimpleFilters && (
                    <Filters
                      catalogDataByCategory={catalogDataByCategory}
                      getFilteredProducts={getFilteredProducts}
                      setFilteredItems={handleMobileFilterChange}
                      onShowAllProducts={handleMobileShowAllProducts}
                      initialActiveCategory={filterState.activeCategory}
                      initialSelectedItem={filterState.selectedItem}
                      externalAllProducts={ALL_PRODUCTS}
                    />
                  )}
                </Paper>
              </motion.div>
            </ClickAwayListener>
          )}
        </AnimatePresence>
      )}
    </Box>
  )
}

export default FiltersMobile
