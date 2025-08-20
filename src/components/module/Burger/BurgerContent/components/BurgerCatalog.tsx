import {
  arrowRotateTransition,
  itemVariants,
  listVariants,
} from '@/components/ui/Header/CatalogPopup/catalogPopupAnimations'
import {
  catalogButtonTextStyles,
  getCatalogButtonStyles,
} from '@/components/ui/Header/CatalogPopup/catalogPopupStyles'
import {
  headerVariants,
  iconVariants,
} from '@/sections/ForMainPage/Catalog/Helpers/Filters/filtersAnimations'
import {
  accordionDetailsStyles,
  accordionHeaderTextStyles,
  accordionSummaryStyles,
  expandIconStyles,
  getAccordionStyles,
  getCatalogMainAccordionStyles,
  getListItemStyles,
  listItemLinkStyles,
} from '@/sections/ForMainPage/Catalog/Helpers/Filters/filtersStyles'

// Логика компонента
import {
  setActiveEquipment,
  setCategory,
} from '@/context/slices/filteredItemsSlice'
import { triggerScrollToCatalog } from '@/context/slices/scrollSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { useProducts } from '@/scripts/hooks/useProducts'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface BurgerCatalogProps {
  onClose?: () => void
}

export const BurgerCatalog = ({ onClose }: BurgerCatalogProps) => {
  // Основные хуки
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { filterOptionsByGroup, getCategoryFromEquipment } = useProducts()

  // Состояние компонента
  const [catalogOpen, setCatalogOpen] = useState<boolean>(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Данные каталога
  const catalogData = filterOptionsByGroup

  const handleToggle = (key: string) => {
    setActiveCategory((prev) => (prev === key ? null : key))
  }

  const handleCatalogToggle = () => {
    setCatalogOpen((prev) => !prev)
    // При закрытии главного аккордиона сбрасываем активную категорию
    if (catalogOpen) {
      setActiveCategory(null)
    }
  }

  const handleItemClick = (item: string) => {
    onClose?.()

    const category = getCategoryFromEquipment(item)
    dispatch(setCategory(category || ''))
    dispatch(setActiveEquipment(item))

    const isOnHomePage = location.pathname === '/'

    if (isOnHomePage) {
      dispatch(triggerScrollToCatalog())
    } else {
      navigate('/', {
        state: {
          shouldScrollToCatalog: true,
        },
      })
    }
  }

  if (Object.keys(catalogData).length === 0) {
    return (
      <div className='burger-catalog__filters'>
        <Accordion
          expanded={catalogOpen}
          sx={getCatalogMainAccordionStyles(catalogOpen)}
          disableGutters
          square
        >
          <ListItemButton
            onClick={handleCatalogToggle}
            sx={{
              ...getCatalogButtonStyles(catalogOpen),
              marginBottom: '5px',
            }}
          >
            <Typography sx={catalogButtonTextStyles}>Каталог</Typography>
            <motion.div
              animate={{ rotate: catalogOpen ? 180 : 0 }}
              transition={arrowRotateTransition}
            >
              <KeyboardArrowDownIcon sx={{ display: 'flex' }} />
            </motion.div>
          </ListItemButton>

          <AnimatePresence initial={false}>
            {catalogOpen && (
              <motion.div
                key='catalog-content'
                variants={listVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                style={{ overflow: 'hidden' }}
              >
                <AccordionDetails sx={accordionDetailsStyles}>
                  <Typography
                    sx={{ padding: '16px', color: 'var(--main-color)' }}
                  >
                    Загрузка данных каталога...
                  </Typography>
                </AccordionDetails>
              </motion.div>
            )}
          </AnimatePresence>
        </Accordion>
      </div>
    )
  }

  return (
    <div className='burger-catalog__filters'>
      <Accordion
        expanded={catalogOpen}
        sx={getCatalogMainAccordionStyles(catalogOpen)}
        disableGutters
        square
      >
        <ListItemButton
          onClick={handleCatalogToggle}
          sx={{
            ...getCatalogButtonStyles(catalogOpen),
            marginBottom: '5px',
          }}
        >
          <Typography sx={catalogButtonTextStyles}>Каталог</Typography>
          <motion.div
            animate={{ rotate: catalogOpen ? 180 : 0 }}
            transition={arrowRotateTransition}
          >
            <KeyboardArrowDownIcon sx={{ display: 'flex' }} />
          </motion.div>
        </ListItemButton>

        <AnimatePresence initial={false}>
          {catalogOpen && (
            <motion.div
              key='catalog-content'
              variants={listVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              style={{ overflow: 'hidden' }}
            >
              <AccordionDetails sx={accordionDetailsStyles}>
                {Object.entries(catalogData).map(([key, items]) => {
                  const expanded = activeCategory === key

                  return (
                    <Accordion
                      key={key}
                      expanded={expanded}
                      sx={getAccordionStyles(expanded)}
                      disableGutters
                      square
                    >
                      <motion.div
                        variants={headerVariants}
                        initial='rest'
                        whileHover='hover'
                        animate='rest'
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
                        >
                          <Typography
                            sx={accordionHeaderTextStyles}
                            component='span'
                          >
                            {key}
                          </Typography>
                        </AccordionSummary>
                      </motion.div>

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
                                {items?.map((item: string) => (
                                  <motion.div
                                    key={item}
                                    variants={itemVariants}
                                  >
                                    <ListItem
                                      disablePadding
                                      sx={getListItemStyles(false)}
                                    >
                                      <Link
                                        onClick={(e) => {
                                          e.preventDefault()
                                          handleItemClick(item)
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
              </AccordionDetails>
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion>
    </div>
  )
}

export default BurgerCatalog
