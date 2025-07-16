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
import { useState } from 'react'

type Keys = 'Приготування фаршу' | "Сепаратори м'яса" | 'Сепаратори м'

const content: Record<Keys, string[]> = {
  'Приготування фаршу': ['Куттери', 'Вовчки', 'Блокорізки'],
  "Сепаратори м'яса": ['Маховик', 'Клапан', 'Галантерея'],
  'Сепаратори м': ['Маховыик', 'Клапыан', 'Галантереыя'],
}

// Варианты для списка с задержкой по каждому элементу
const listVariants: Variants = {
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05, // Задержка между появлением пунктов
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

// Вращение стрелочки с пружиной
const iconVariants: Variants = {
  open: {
    rotate: 180,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
  closed: {
    rotate: 0,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
}

// Параллакс для заголовка при наведении
const headerVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 2, transition: { type: 'spring', stiffness: 300, damping: 15 } },
}

export default function Filters() {
  const [activeItem, setActiveItem] = useState<Keys | null>(null)

  const handleToggle = (key: Keys) => {
    setActiveItem((prev) => (prev === key ? null : key))
  }

  return (
    <div className='сatalog__filters'>
      <Typography sx={{ padding: '16px' }}>Уся продукція</Typography>

      {(Object.keys(content) as Keys[]).map((key) => {
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
                      {content[key].map((item) => (
                        <motion.div key={item} variants={itemVariants}>
                          <ListItem
                            disablePadding
                            sx={{ padding: '12px 16px' }}
                          >
                            <Link
                              underline='none'
                              href='#'
                              color='inherit'
                              sx={{ display: 'block', width: '100%' }}
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
