import MainButton from '@/components/module/MainButton/MainButton'
import { Product } from '@/types/products'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import './style.css'

interface ProductDetailProps {
  product: Product
  directusUrl: string
}

export const ProductDetail = ({ product, directusUrl }: ProductDetailProps) => {
  const getProductImages = () => {
    const images = []

    if (product.photo_url) {
      images.push(product.photo_url)
    }

    if (product.all_photos && Array.isArray(product.all_photos)) {
      product.all_photos.forEach((photoItem) => {
        if (
          photoItem.directus_files_id &&
          photoItem.directus_files_id !== product.photo_url
        ) {
          images.push(photoItem.directus_files_id)
        }
      })
    }

    return images
  }

  const images = getProductImages()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const maxVisibleThumbnails = 3

  const getThumbnailRange = () => {
    if (images.length <= maxVisibleThumbnails) {
      return { start: 0, end: images.length }
    }

    const halfVisible = Math.floor(maxVisibleThumbnails / 2)
    let start = currentImageIndex - halfVisible
    let end = currentImageIndex + halfVisible + 1

    if (start < 0) {
      end = end - start
      start = 0
    }
    if (end > images.length) {
      start = start - (end - images.length)
      end = images.length
    }

    return { start: Math.max(0, start), end: Math.min(images.length, end) }
  }

  const { start: thumbnailStartIndex, end: thumbnailEndIndex } =
    getThumbnailRange()

  const formatPrice = (price: number | string) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1)
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1)
    }
  }

  const visibleThumbnails = images.slice(thumbnailStartIndex, thumbnailEndIndex)

  return (
    <>
      <Box
        className='product-detail'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          {images.length > 1 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80px',
                justifyContent: 'space-between',
              }}
            >
              {images.length > 1 && (
                <IconButton
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  sx={{
                    mb: 1,
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--blue-light-color)',
                    borderRadius: '10px',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: 'var(--blue-light-color)',
                    },
                    '&:disabled': {
                      opacity: 0.3,
                    },
                  }}
                >
                  <KeyboardArrowUpIcon sx={{ color: 'var(--main-color)' }} />
                </IconButton>
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  gap: '14px',
                  justifyContent: 'center',
                }}
              >
                {visibleThumbnails.map((image, index) => {
                  const actualIndex = thumbnailStartIndex + index
                  return (
                    <motion.div
                      key={actualIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card
                        onClick={() => handleThumbnailClick(actualIndex)}
                        sx={{
                          width: '83px',
                          height: '83px',
                          cursor: 'pointer',
                          border:
                            currentImageIndex === actualIndex
                              ? '2px solid var(--main-color)'
                              : '1px solid var(--blue-light-color)',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          transition: 'all 0.2s ease',
                          background:
                            currentImageIndex === actualIndex
                              ? 'transparent'
                              : 'rgba(4, 2, 41, 0.4)',
                          '&:hover': {
                            borderColor: 'var(--main-color)',
                            transform: 'translateY(-2px)',
                            background: 'transparent',
                          },
                        }}
                      >
                        <CardMedia
                          component='img'
                          image={`${directusUrl}assets/${image}`}
                          alt={`${product.product_name} - зображення ${actualIndex + 1}`}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            backgroundColor: '#f5f5f5',
                          }}
                        />
                      </Card>
                    </motion.div>
                  )
                })}
              </Box>

              {images.length > 1 && (
                <IconButton
                  onClick={handleNextImage}
                  disabled={currentImageIndex === images.length - 1}
                  sx={{
                    mt: 1,
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--blue-light-color)',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'var(--blue-light-color)',
                    },
                    '&:disabled': {
                      opacity: 0.3,
                    },
                  }}
                >
                  <KeyboardArrowDownIcon sx={{ color: 'var(--main-color)' }} />
                </IconButton>
              )}
            </Box>
          )}

          <Box
            sx={{
              width: '600px',
              height: '500px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Card
                sx={{
                  width: '600px',
                  height: '500px',
                  borderRadius: '10px',
                  boxShadow: '0 0 0 1px var(--blue-light-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa',
                }}
              >
                <CardMedia
                  component='img'
                  image={`${directusUrl}assets/${images[currentImageIndex] || product.photo_url}`}
                  alt={`${product.product_name} від ${product.brands_names.brand_name} - професійне м'ясопереробне обладнання`}
                  loading='lazy'
                  sx={{
                    maxWidth: '600px',
                    maxHeight: '500px',
                    minWidth: '500px',
                    minHeight: '400px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Card>
            </motion.div>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            minWidth: '400px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              sx={{
                height: '500px',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Название товара */}
                <Typography
                  variant='h3'
                  component='h1'
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    lineHeight: 1.2,
                    background:
                      'linear-gradient(135deg, #1a1a2e 0%, #16213e 80%, var(--main-color) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  {product.product_name}
                </Typography>

                {/* Тизер */}
                <Typography
                  variant='body1'
                  sx={{
                    color: '#6c757d',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    mb: 3,
                    fontStyle: 'italic',
                  }}
                >
                  {product.teaser}
                </Typography>

                {/* Цена и кнопка */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: '30px',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'baseline',
                      gap: 2,
                      background:
                        'linear-gradient(135deg, var(--main-color) 0%, #0f3460 100%)',
                      borderRadius: '16px',
                      padding: '16px 24px',
                      boxShadow: '0 8px 32px rgba(15, 52, 96, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s',
                      },
                      '&:hover::before': {
                        transform: 'translateX(100%)',
                      },
                    }}
                  >
                    <Typography
                      variant='h4'
                      sx={{
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '2.2rem',
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    <Typography
                      variant='h6'
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '1.2rem',
                      }}
                    >
                      {product.currency_name?.currency_name || '₴'}
                    </Typography>
                  </Box>

                  {/* Кнопка */}
                  <Box sx={{ mt: 'auto' }}>
                    <MainButton />
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box
            sx={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background:
                  'linear-gradient(90deg, var(--main-color) 0%, #0f3460 50%, transparent 100%)',
              },
            }}
          >
            <Typography
              variant='h5'
              sx={{
                mb: 3,
                fontWeight: 600,
                fontSize: '1.4rem',
                color: '#1a1a2e',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '80px',
                  height: '3px',
                  background:
                    'linear-gradient(90deg, var(--main-color), #0f3460)',
                  borderRadius: '2px',
                },
              }}
            >
              Опис товару
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: '#495057',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              {product.description}
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </>
  )
}
