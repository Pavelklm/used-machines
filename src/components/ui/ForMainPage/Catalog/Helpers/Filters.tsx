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

export default function Filters() {
  const [activeItem, setActiveItem] = useState<Keys | null>(null)

  return (
    <div className='сatalog__filters'>
      <Typography sx={{ padding: '16px' }}>Уся продукція</Typography>

      {(Object.keys(content) as Keys[]).map((key) => (
        <Accordion
          onClick={() => setActiveItem((prev) => (prev === key ? null : key))}
          sx={{
            border:
              activeItem === key ? '1px solid var(--blue-bright-color)' : '',

            borderRadius: '16px',
          }}
          key={key}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${key}-content`}
            id={`${key}-header`}
            sx={{ padding: '16px', borderRadius: '16px' }}
          >
            <Typography sx={{ margin: '0', width: '223px' }} component='span'>
              {key}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              margin: '0',
            }}
          >
            <List disablePadding>
              {content[key].map((item) => (
                <ListItem
                  key={item}
                  disablePadding
                  sx={{ padding: '4px 16px' }}
                >
                  <Link
                    href='#'
                    underline='hover'
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

type Keys = 'Приготування фаршу' | "Сепаратори м'яса"

const content: Record<Keys, string[]> = {
  'Приготування фаршу': ['Куттери', 'Вовчки', 'Блокорізки'],
  "Сепаратори м'яса": ['Маховик', 'Клапан', 'Галантерея'],
}
