import { clearFilteredItems } from '@/context/slices/filteredItemsSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
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
import { useCallback, useState } from 'react'

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
}: {
  catalogDataByCategory: Record<string, string[]>
  getFilteredProducts: (name: string) => any[]
  setFilteredItems: (items: any[]) => void
  onShowAllProducts?: () => void
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleToggle = useCallback((key: string) => {
    setActiveItem((prev) => (prev === key ? null : key))
  }, [])

  const handleClick = useCallback(
    (item: string) => {
      setSelectedItem(item)
      const filtered = getFilteredProducts(item)
      setFilteredItems(filtered)
    },
    [getFilteredProducts, setFilteredItems]
  )

  const handleShowAllProducts = useCallback(() => {
    dispatch(clearFilteredItems())
    setSelectedItem('Уся продукція')
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
          boxShadow: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor:
            selectedItem === 'Уся продукція'
              ? 'var(--main-color)'
              : 'transparent',
          color: selectedItem === 'Уся продукція' ? '#fff' : 'inherit',
          '&:hover': {
            background: 'var(--main-color)',
            color: '#fff ',
          },
        }}
      >
        Уся продукція
      </Typography>

      {Object.keys(catalogDataByCategory).map((key) => {
        const expanded = activeItem === key

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
              mb: 1,
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
                  <ExpandMoreIcon />
                </motion.div>
              }
              aria-controls={`${key}-content`}
              id={`${key}-header`}
              sx={{
                padding: '16px',
                borderRadius: '16px',
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
                  <AccordionDetails sx={{ margin: 0, padding: '8px 0 16px' }}>
                    <List disablePadding>
                      {catalogDataByCategory[key].map((item) => (
                        <motion.div key={item} variants={itemVariants}>
                          <ListItem
                            disablePadding
                            sx={{
                              borderRadius: '10px',
                              transition: 'all 0.3s ease',
                              backgroundColor:
                                selectedItem === item
                                  ? 'var(--main-color)'
                                  : 'transparent',
                              color: selectedItem === item ? '#fff' : 'inherit',
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
