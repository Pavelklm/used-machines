// sections/ForMainPage/Catalog/Helpers/Cards.tsx
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // 🆕 Добавили импорт

interface Item {
  id: any
  price: number | string
  currency: string
  url: string
  name: string
  isPlaceholder?: boolean
  product_name?: string
  brand_name?: string
}

interface CardsProps {
  items: Item[]
  itemsPerPage: number
  animationKey?: string | number
}

export default function Cards({
  items,
  itemsPerPage,
  animationKey,
}: CardsProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const fullPageItems: (Item & { isPlaceholder?: boolean })[] = [
    ...items,
    ...Array.from({
      length: Math.max(0, itemsPerPage - items.length),
    }).map(
      (_, index) =>
        ({
          id: `placeholder-${index}`,
          brand_name: '',
          price: '',
          currency: '',
          url: '',
          name: '',
          product_name: '',
          isPlaceholder: true,
        }) as Item & { isPlaceholder: boolean }
    ),
  ]

  useEffect(() => {
    if (animationKey !== undefined) {
      setIsAnimating(true)
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
        {fullPageItems.map((item, index) => {
          const rowIndex = Math.floor(index / 3)
          const colIndex = index % 3
          const centerX = 1 - colIndex
          const centerY = 1 - rowIndex

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
                      x: centerX * 309,
                      y: centerY * 410,
                      rotate: (Math.random() - 0.5) * 10,
                      zIndex: fullPageItems.length - index,
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
                    position: 'relative',
                  }}
                >
                  <img
                    draggable='false'
                    className='empty_product_img'
                    src='/icons/empty_product.svg'
                    alt='empty product'
                  />
                  <Skeleton
                    variant='circular'
                    width={289}
                    height={220}
                    animation='wave'
                    sx={{
                      borderRadius: 2,
                      background: 'transparent',
                      draggable: 'false',
                    }}
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
                <Link
                  to={`/product/${item.id}`}
                  style={{ textDecoration: 'none' }}
                >
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
                      alt={`${item.product_name} - професійне м'ясне обладнання`}
                      sx={{ borderRadius: '10px' }}
                      loading='lazy'
                      draggable='false'
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
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: '19px',
                          color: 'var(--main-color)',
                        }}
                      >
                        {item.brand_name}
                      </Typography>
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
                </Link>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
