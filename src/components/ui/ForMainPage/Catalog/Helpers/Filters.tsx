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
import { useState } from 'react'

type Keys = 'Приготування фаршу' | "Сепаратори м'яса" | 'Сепаратори м'

const content: Record<Keys, string[]> = {
  'Приготування фаршу': ['Куттери', 'Вовчки', 'Блокорізки'],
  "Сепаратори м'яса": ['Маховик', 'Клапан', 'Галантерея'],
  'Сепаратори м': ['Маховыик', 'Клапыан', 'Галантереыя'],
}

export default function Filters() {
  const [activeItem, setActiveItem] = useState<Keys | null>(null)

  const handleToggle = (key: Keys) => {
    setActiveItem((prev) => (prev === key ? null : key))
  }

  return (
    <div className='сatalog__filters'>
      <Typography sx={{ padding: '16px' }}>Уся продукція</Typography>

      {(Object.keys(content) as Keys[]).map((key) => (
        <Accordion
          key={key}
          expanded={activeItem === key}
          sx={{
            border:
              activeItem === key
                ? '1px solid var(--blue-light-color)'
                : '1px solid transparent',
            borderRadius: '16px',
            boxShadow: 'none',
            mb: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${key}-content`}
            id={`${key}-header`}
            sx={{
              padding: '16px',
              borderRadius: '16px',
              minHeight: 0,
            }}
            onClick={() => handleToggle(key)}
          >
            <Typography sx={{ margin: 0, width: '223px' }} component='span'>
              {key}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ margin: 0, padding: '8px 0 16px' }}>
            <List disablePadding>
              {content[key].map((item) => (
                <ListItem
                  key={item}
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
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
