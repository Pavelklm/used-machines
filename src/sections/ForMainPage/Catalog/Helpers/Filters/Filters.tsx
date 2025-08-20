import { type FilteredItem } from '@/context/slices/filteredItemsSlice'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { AnimatePresence, motion } from 'framer-motion'
import {
  headerVariants,
  iconVariants,
  itemVariants,
  listVariants,
} from './filtersAnimations'
import {
  accordionDetailsStyles,
  accordionHeaderTextStyles,
  accordionSummaryStyles,
  expandIconStyles,
  getAccordionStyles,
  getListItemStyles,
  getShowAllProductsStyles,
  listItemLinkStyles,
} from './filtersStyles'
import { useFilters } from './useFilters'

interface FiltersProps {
  catalogDataByCategory: Record<string, string[]>
  getFilteredProducts: (name: string) => FilteredItem[]
  setFilteredItems: (items: FilteredItem[]) => void
  onShowAllProducts?: () => void
}

export default function Filters({
  catalogDataByCategory,
  getFilteredProducts,
  setFilteredItems,
  onShowAllProducts,
}: FiltersProps) {
  const {
    filterState,
    ALL_PRODUCTS,
    handleToggle,
    handleClick,
    handleShowAllProducts,
  } = useFilters({
    catalogDataByCategory,
    getFilteredProducts,
    setFilteredItems,
    onShowAllProducts,
  })

  return (
    <div className='сatalog__filters'>
      <Typography
        onClick={handleShowAllProducts}
        sx={getShowAllProductsStyles(filterState.selectedItem === ALL_PRODUCTS)}
      >
        {ALL_PRODUCTS}
      </Typography>

      {Object.keys(catalogDataByCategory).map((key) => {
        const expanded = filterState.activeCategory === key

        return (
          <Accordion
            key={key}
            expanded={expanded}
            sx={getAccordionStyles(expanded)}
            disableGutters
            square
          >
            <AccordionSummary
              expandIcon={
                <motion.div
                  variants={iconVariants}
                  animate={expanded ? 'open' : 'closed'}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ExpandMoreIcon sx={expandIconStyles} />
                </motion.div>
              }
              aria-controls={`${key}-content`}
              id={`${key}-header`}
              sx={accordionSummaryStyles}
              onClick={() => handleToggle(key)}
              component={motion.div}
              variants={headerVariants}
              initial='rest'
              whileHover='hover'
              animate='rest'
            >
              <Typography sx={accordionHeaderTextStyles} component='span'>
                {key}
              </Typography>
            </AccordionSummary>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key='content'
                  variants={listVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  style={{ overflow: 'hidden' }}
                >
                  <AccordionDetails sx={accordionDetailsStyles}>
                    <List disablePadding>
                      {catalogDataByCategory[key].map((item) => (
                        <motion.div key={item} variants={itemVariants}>
                          <ListItem
                            disablePadding
                            sx={getListItemStyles(
                              filterState.selectedItem === item
                            )}
                          >
                            <Link
                              onClick={(e) => {
                                e.preventDefault()
                                handleClick(item)
                              }}
                              underline='none'
                              href='#'
                              color='inherit'
                              sx={listItemLinkStyles}
                            >
                              {item}
                            </Link>
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </AccordionDetails>
                </motion.div>
              )}
            </AnimatePresence>
          </Accordion>
        )
      })}
    </div>
  )
}
