import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { AnimatePresence, motion } from 'framer-motion'

interface Item {
  name: string
  price: number | string
  currency: string
  url: string
  isPlaceholder?: boolean
}

interface CardsProps {
  items: Item[]
}

export default function Cards({ items }: CardsProps) {
  return (
    <AnimatePresence mode='wait'>
      {items.map((item, index) => (
        <motion.div
          key={
            item.isPlaceholder
              ? `placeholder-${index}`
              : `${item.name}-${index}`
          }
          layout
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          custom={index}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            delay: index * 0.02,
          }}
          style={{ display: 'block' }}
        >
          {item.isPlaceholder ? (
            <Card
              sx={{
                maxWidth: 289,
                height: 390,
                borderRadius: '10px',
                border: '1px dashed var(--blue-light-color)',
                opacity: 0.6,
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Skeleton
                variant='circular'
                width={289}
                height={289}
                animation='wave'
                sx={{ borderRadius: 2 }}
              />
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '21px',
                  padding: '16px',
                }}
              >
                Очікуємо нові товари
              </Typography>
            </Card>
          ) : (
            <Card
              sx={{
                width: 289,
                cursor: 'pointer',
                borderRadius: '10px',
                boxShadow: '0 0 0 1px var(--blue-light-color)',
                filter: 'brightness(1)',
                transform: 'translateY(0)',
                transition:
                  'transform 0.4s ease, filter 0.4s ease, box-shadow 0.4s ease',
                '&:hover': {
                  boxShadow: '0 0 0 1px var(--blue-bright-color)',
                  transform: 'translateY(-4px)',
                  filter: 'brightness(0.85)',
                },
              }}
            >
              <CardMedia
                component='img'
                height='289'
                image={`/icons/${item.url}`}
                alt={item.name}
                sx={{ borderRadius: '10px' }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography
                  variant='body2'
                  sx={{
                    fontSize: '18px',
                    fontWeight: '400',
                    lineHeight: '21px',
                  }}
                >
                  {item.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '19px',
                      color: 'var(--main-color)',
                    }}
                  >
                    {item.price} {item.currency}
                  </Typography>
                  <ChevronRightIcon color='primary' />
                </Box>
              </CardContent>
            </Card>
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
