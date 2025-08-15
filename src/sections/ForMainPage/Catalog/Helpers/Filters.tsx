import {
  clearFilteredItems,
  setActiveEquipment,
  setActiveScroll,
  setCategory,
  type FilteredItem,
} from '@/context/slices/filteredItemsSlice'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'

// Константы
const ALL_PRODUCTS = 'Уся продукція' as const

// Типизация для состояния фильтров
interface FilterState {
  activeCategory: string | null // какая категория раскрыта
  selectedItem: string // что выбрано (подсвечено)
}

interface FiltersProps {
  catalogDataByCategory: Record<string, string[]>
  getFilteredProducts: (name: string) => FilteredItem[]
  setFilteredItems: (items: FilteredItem[]) => void
  onShowAllProducts?: () => void
}

const listVariants: Variants = {
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    transition: { when: 'afterChildren' },
  },
}

const itemVariants: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  hidden: { opacity: 0, x: -20 },
}

const iconVariants: Variants = {
  open: {
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 40 },
  },
  closed: {
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 40 },
  },
}

const headerVariants: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: { type: 'spring', stiffness: 300, damping: 15 } },
}

export default function Filters({
  catalogDataByCategory,
  getFilteredProducts,
  setFilteredItems,
  onShowAllProducts,
}: FiltersProps) {
  // Объединяем состояние в одно место
  const [filterState, setFilterState] = useState<FilterState>({
    activeCategory: null,
    selectedItem: ALL_PRODUCTS,
  })

  const dispatch = useAppDispatch()

  // Мемоизируем обратный индекс item -> category для оптимизации
  const itemToCategoryMap = useMemo(() => {
    const map: Record<string, string> = {}
    Object.entries(catalogDataByCategory).forEach(([category, items]) => {
      items.forEach((item) => {
        map[item] = category
      })
    })
    return map
  }, [catalogDataByCategory])

  // Оригинальные селекторы для восстановления состояния фильтров
  const category = useAppSelector((state) => state.filteredItems.category)
  const equipment = useAppSelector(
    (state) => state.filteredItems.activeEquipment
  )
  const filteredItems = useAppSelector(
    (state) => state.filteredItems.filteredItems
  )

  const activeScroll = useAppSelector(
    (state) => state.filteredItems.activeScroll
  )

  // Упрощенная логика восстановления
  useEffect(() => {
    if (activeScroll && category && equipment) {
      setFilterState({
        activeCategory: category,
        selectedItem: equipment,
      })
      dispatch(setActiveScroll(false))

      const filtered = getFilteredProducts(equipment)
      if (JSON.stringify(filtered) !== JSON.stringify(filteredItems)) {
        setFilteredItems(filtered)
      }
    }
  }, [
    activeScroll,
    category,
    equipment,
    dispatch,
    getFilteredProducts,
    setFilteredItems,
    filteredItems,
  ])

  const handleToggle = useCallback((key: string) => {
    setFilterState((prev) => ({
      ...prev,
      activeCategory: prev.activeCategory === key ? null : key,
    }))
  }, [])

  const handleClick = useCallback(
    (item: string) => {
      const categoryForItem = itemToCategoryMap[item]

      dispatch(setCategory(categoryForItem || ''))
      dispatch(setActiveEquipment(item))

      setFilterState((prev) => ({
        ...prev,
        selectedItem: item,
      }))

      const filtered = getFilteredProducts(item)
      setFilteredItems(filtered)
    },
    [itemToCategoryMap, getFilteredProducts, setFilteredItems]
  )

  const handleShowAllProducts = useCallback(() => {
    dispatch(clearFilteredItems())
    dispatch(setCategory(''))
    dispatch(setActiveEquipment(''))
    setFilterState({
      activeCategory: null,
      selectedItem: ALL_PRODUCTS,
    })
    if (onShowAllProducts) {
      onShowAllProducts()
    }
  }, [dispatch, onShowAllProducts])

  return (
    <div className='сatalog__filters'>
      <Typography
        onClick={handleShowAllProducts}
        sx={{
          padding: '16px',
          borderRadius: '16px',
          marginBottom: '5px',
          boxShadow: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor:
            filterState.selectedItem === ALL_PRODUCTS
              ? 'var(--main-color)'
              : 'transparent',
          color: filterState.selectedItem === ALL_PRODUCTS ? '#fff' : 'inherit',
          '&:hover': {
            background: 'var(--blue-bright-color)',
            color: '#fff ',
          },
        }}
      >
        {ALL_PRODUCTS}
      </Typography>

      {Object.keys(catalogDataByCategory).map((key) => {
        const expanded = filterState.activeCategory === key

        return (
          <Accordion
            key={key}
            expanded={expanded}
            sx={{
              border: expanded
                ? '1px solid var(--blue-light-color)'
                : '1px solid transparent',
              borderRadius: '16px',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
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
                  <ExpandMoreIcon sx={{ color: 'var(--main-color)' }} />
                </motion.div>
              }
              aria-controls={`${key}-content`}
              id={`${key}-header`}
              sx={{
                padding: '16px',
                borderRadius: '16px',
                paddingBottom: '0px !important',

                minHeight: 0,
                overflow: 'hidden',
              }}
              onClick={() => handleToggle(key)}
              component={motion.div}
              variants={headerVariants}
              initial='rest'
              whileHover='hover'
              animate='rest'
            >
              <Typography sx={{ margin: 0, width: '223px' }} component='span'>
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
                  <AccordionDetails sx={{ margin: 0, padding: '0 0 16px 0' }}>
                    <List disablePadding>
                      {catalogDataByCategory[key].map((item) => (
                        <motion.div key={item} variants={itemVariants}>
                          <ListItem
                            disablePadding
                            sx={{
                              borderRadius: '10px',
                              transition: 'all 0.3s ease',
                              backgroundColor:
                                filterState.selectedItem === item
                                  ? 'var(--main-color)'
                                  : 'transparent',
                              color:
                                filterState.selectedItem === item
                                  ? '#fff'
                                  : 'inherit',
                              '&:hover': {
                                backgroundColor: 'var(--blue-bright-color)',
                                color: '#fff',
                              },
                            }}
                          >
                            <Link
                              onClick={(e) => {
                                e.preventDefault()
                                handleClick(item)
                              }}
                              underline='none'
                              href='#'
                              color='inherit'
                              sx={{
                                display: 'block',
                                width: '100%',
                                padding: '12px 16px',
                              }}
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
