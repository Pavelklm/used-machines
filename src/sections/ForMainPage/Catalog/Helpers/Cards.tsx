import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Item {
  id: any
  price: number | string
  currency: string
  url: string
  name: string
  isPlaceholder?: boolean
  product_name?: string
}

interface CardsProps {
  items: Item[]
  animationKey?: string | number // Ключ для запуска анимации при изменении
}

export default function Cards({ items, animationKey }: CardsProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Запускаем анимацию при изменении animationKey (фильтра)
    if (animationKey !== undefined) {
      setIsAnimating(true)
      // Сбрасываем флаг после завершения анимации
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [animationKey])

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={animationKey}
        style={{
          display: 'contents',
        }}
      >
        {items.map((item, index) => {
          const rowIndex = Math.floor(index / 3) // Для сетки 3x2
          const colIndex = index % 3

          const centerX = 1 - colIndex // Сдвиг к центральной колонке
          const centerY = 1 - rowIndex // Сдвиг к середине по вертикали

          return (
            <motion.div
              key={
                item.isPlaceholder ? `placeholder-${index}` : `item-${item.id}`
              }
              initial={
                isAnimating
                  ? {
                      opacity: 0,
                      scale: 0.5,
                      x: centerX * 309, // 289px ширина + 20px gap
                      y: centerY * 410, // 390px высота + 20px gap
                      rotate: (Math.random() - 0.5) * 10,
                      zIndex: items.length - index,
                    }
                  : {
                      opacity: 0,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: 0,
                zIndex: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.03,
                type: 'spring',
                stiffness: 200,
                damping: 25,
              }}
            >
              {item.isPlaceholder ? (
                <Card
                  sx={{
                    width: 289,
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
                    image={`${item.url}`}
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
                      {item.product_name}
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
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                        {item.currency}
                      </Typography>
                      <ChevronRightIcon color='primary' />
                    </Box>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
