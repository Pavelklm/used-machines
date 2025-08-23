import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Item {
  id: any
  price: number | string
  currency?: string
  url?: string
  name?: string
  isPlaceholder?: boolean
  product_name?: string
  brand_name?: string
  brand_image?: string | null
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
          brand_image: null,
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
                    width: { xs: 320, sm: 440, md: 354, lg: 314, xl: 289 },
                    height: { xs: 373, sm: 433, md: 373, lg: 373, xl: 373 },
                    borderRadius: '10px',
                    border: '1px solid var(--blue-light-color)',
                    opacity: 0.6,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    boxShadow: 'none',
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
                    animation='wave'
                    sx={{
                      width: { xs: 320, sm: 440, md: 354, lg: 314, xl: 289 },
                      height: { xs: 220, sm: 280, md: 220, lg: 240, xl: 220 },
                      borderRadius: 2,
                      background: 'transparent',
                      draggable: 'false',
                    }}
                  />
                  <Typography
                    variant='body2'
                    sx={{
                      color: 'var(--blue-light-color)',
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
                      width: { xs: 320, sm: 440, md: 354, lg: 314, xl: 289 },
                      height: { xs: 373, sm: 433, md: 373, lg: 373, xl: 373 },
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
                        filter: 'brightness(0.97)',
                      },
                    }}
                  >
                    <CardMedia
                      component='img'
                      height='220'
                      width='314'
                      image={item.url || '/images/placeholder.jpg'}
                      alt={`${item.product_name || 'Продукт'} - професійне м'ясне обладнання`}
                      sx={{
                        width: { xs: 320, sm: 440, md: 354, lg: 314, xl: 289 },
                        height: { xs: 220, sm: 280, md: 220, lg: 240, xl: 220 },
                        borderRadius: '10px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      loading='lazy'
                      draggable='false'
                    />
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        padding: '20px',
                      }}
                    >
                      {item.brand_name && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            marginBottom: '10px',
                            color: 'var(--main-color)',
                          }}
                        >
                          {item.brand_image && (
                            <Box
                              component='img'
                              src={item.brand_image}
                              alt={item.brand_name}
                              sx={{
                                width: '30px',
                                height: '30px',
                                objectFit: 'contain',
                              }}
                            />
                          )}
                          <Typography
                            variant='caption'
                            sx={{
                              fontSize: '12px',
                              fontWeight: '500',
                              color: 'var(--main-color)',
                              textTransform: 'uppercase',
                            }}
                          >
                            {item.brand_name}
                          </Typography>
                        </Box>
                      )}

                      <Typography
                        variant='body2'
                        sx={{
                          fontSize: '18px',
                          fontWeight: '400',
                          lineHeight: '21px',
                          marginBottom: '15px',
                        }}
                      >
                        {item.product_name || 'Назва продукту'}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto',
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
                          {(item.price || 0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                          {item.currency || 'грн'}
                        </Typography>
                        <ChevronRightIcon sx={{ color: 'var(--main-color)' }} />
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
