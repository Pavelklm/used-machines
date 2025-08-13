import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const ImageGallery = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  directusUrl,
  productName,
  brandName,
}: {
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  directusUrl: string
  productName: string
  brandName: string
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const maxVisibleThumbnails = 3
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    if (!isModalOpen) return

    // Блокируем скролл более агрессивно
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = '0'

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1)
          break
        case 'Escape':
          e.preventDefault()
          setIsModalOpen(false)
          break
        case 'Home':
          e.preventDefault()
          setCurrentImageIndex(0)
          break
        case 'End':
          e.preventDefault()
          setCurrentImageIndex(images.length - 1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Восстанавливаем скролл
      document.body.style.overflow = originalOverflow || 'auto'
      document.body.style.position = originalPosition || 'static'
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isModalOpen, currentImageIndex, images.length, setCurrentImageIndex])

  const getThumbnailRange = () => {
    if (images.length <= maxVisibleThumbnails) {
      return { start: 0, end: images.length, indices: Array.from({ length: images.length }, (_, i) => i) }
    }

    const halfVisible = Math.floor(maxVisibleThumbnails / 2)
    const indices = []
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      let index = currentImageIndex + i
      // Циклическая логика
      if (index < 0) {
        index = images.length + index
      } else if (index >= images.length) {
        index = index - images.length
      }
      indices.push(index)
    }
    
    return { start: 0, end: indices.length, indices }
  }

  const { indices: visibleIndices } = getThumbnailRange()
  const visibleThumbnails = visibleIndices.map(index => ({ image: images[index], index }))

  const navigationButtonStyles = {
    width: '40px',
    height: '40px',
    border: '1px solid var(--blue-light-color)',
    borderRadius: '10px',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: 'var(--blue-bright-color)',
      '& .MuiSvgIcon-root': {
        color: '#fff',
      },
    },
    '&:disabled': { opacity: 0.3 },
  }

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      {hasMultipleImages && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80px',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            onClick={() =>
              setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)
            }
            sx={{ ...navigationButtonStyles, mb: 1 }}
          >
            <KeyboardArrowUpIcon sx={{ color: 'var(--main-color)' }} />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: '14px',
              justifyContent: 'center',
            }}
          >
            {visibleThumbnails.map((thumbnail, index: number) => {
              const actualIndex = thumbnail.index
              const isActive = currentImageIndex === actualIndex

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
                    onClick={() => setCurrentImageIndex(actualIndex)}
                    sx={{
                      width: '83px',
                      height: '83px',
                      cursor: 'pointer',
                      border: isActive
                        ? '2px solid var(--blue-bright-color)'
                        : 'none',
                      position: 'relative',
                      boxShadow: isActive ? 'none' : 'none',
                      '&::before': !isActive
                        ? {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#04022966',
                            zIndex: 1,
                            borderRadius: '10px',
                          }
                        : {},
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'var(--main-color)',
                        transform: 'translateY(-2px)',
                        background: 'transparent',
                      },
                    }}
                  >
                    <CardMedia
                      component='img'
                      image={`${directusUrl}assets/${thumbnail.image}`}
                      alt={`${productName} - зображення ${actualIndex + 1}`}
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

          <IconButton
            onClick={() =>
              setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1)
            }
            sx={{ ...navigationButtonStyles }}
          >
            <KeyboardArrowDownIcon sx={{ color: 'var(--main-color)' }} />
          </IconButton>
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
              cursor: "url('/icons/Cursor_ZoomIn.svg'), zoom-in",
              position: 'relative',
              '&:hover .main-image': {
                transform: 'scale(1.1)',
              },
              '&:hover .zoom-icon': {
                opacity: 1,
              },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <CardMedia
              component='img'
              image={`${directusUrl}assets/${images[currentImageIndex] || images[0]}`}
              alt={`${productName} від ${brandName} - професійне м'ясопереробне обладнання`}
              loading='lazy'
              className='main-image'
              sx={{
                maxWidth: '600px',
                maxHeight: '500px',
                minWidth: '500px',
                minHeight: '400px',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
            />

            {/* Иконка увеличения */}
            <Box
              className='zoom-icon'
              sx={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: '50%',
                padding: '8px',
                color: 'white',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ZoomInIcon sx={{ fontSize: '20px' }} />
            </Box>
          </Card>
        </motion.div>
      </Box>

      {/* Модалка */}
      {isModalOpen &&
        createPortal(
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backdropFilter: 'blur(8px)',
              background: 'rgba(43, 76, 126, 0.4)',
              zIndex: 99999,
              animation: 'fadeIn 0.3s ease',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <Box 
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(12px, 2vh, 20px)',
                maxWidth: 'min(95vw, 1200px)',
                maxHeight: '95vh',
                minWidth: 'clamp(320px, 80vw, 400px)',
                // Адаптивные отступы
                padding: {
                  xs: '10px',
                  sm: '15px', 
                  md: '20px'
                },
              }}
            >
              {/* Название товара */}
              <Typography
                variant='h6'
                sx={{
                  color: 'white',
                  backgroundColor: 'var(--main-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  fontSize: 'clamp(18px, 2.5vw, 26px)',
                  fontWeight: '400',
                  padding: '8px 40px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {productName}
              </Typography>

              {/* Основная картинка */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  // Умная высота: минимум 300px, максимум 70vh, но не больше 800px
                  height: 'clamp(300px, 70vh, 800px)',
                  // На маленьких экранах немного больше места
                  '@media (max-width: 768px)': {
                    height: 'clamp(250px, 60vh, 500px)',
                  },
                }}
              >
                <CardMedia
                  component='img'
                  image={`${directusUrl}assets/${images[currentImageIndex] || images[0]}`}
                  alt={`${productName} - увеличено`}
                  sx={{
                    // Умная ширина: минимум 300px, максимум контейнера, но не больше 900px
                    width: 'clamp(300px, 100%, 900px)',
                    // Высота подстраивается под ширину, но не больше контейнера
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '20px',
                    // На очень маленьких экранах уменьшаем минимальную ширину
                    '@media (max-width: 480px)': {
                      width: 'clamp(250px, 95vw, 400px)',
                    },
                    // На больших экранах ограничиваем максимальный размер
                    '@media (min-width: 1920px)': {
                      maxWidth: '1000px',
                      maxHeight: '700px',
                    },
                  }}
                />
              </Box>

              {/* Навигация с миниатюрами */}
              {hasMultipleImages && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton
                    onClick={() =>
                      setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)
                    }
                    sx={{
                      ...navigationButtonStyles,
                      transform: 'rotate(270deg)',
                      flexShrink: 0,
                    }}
                  >
                    <KeyboardArrowUpIcon sx={{ color: 'var(--main-color)' }} />
                  </IconButton>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 'clamp(8px, 1.5vw, 14px)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {visibleThumbnails.map((thumbnail, index: number) => {
                      const actualIndex = thumbnail.index
                      const isActive = currentImageIndex === actualIndex
                      const thumbnailSize = 'clamp(50px, 8vw, 83px)'

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
                            onClick={() => setCurrentImageIndex(actualIndex)}
                            sx={{
                              width: thumbnailSize,
                              height: thumbnailSize,
                              cursor: 'pointer',
                              border: isActive
                                ? '2px solid var(--blue-bright-color)'
                                : 'none',
                              position: 'relative',
                              boxShadow: isActive ? 'none' : 'none',
                              '&::before': !isActive
                                ? {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: '#04022966',
                                    zIndex: 1,
                                    borderRadius: '10px',
                                  }
                                : {},
                              borderRadius: '10px',
                              overflow: 'hidden',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderColor: 'var(--main-color)',
                                transform: 'translateY(-2px)',
                                background: 'transparent',
                              },
                            }}
                          >
                            <CardMedia
                              component='img'
                              image={`${directusUrl}assets/${thumbnail.image}`}
                              alt={`${productName} - зображення ${actualIndex + 1}`}
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

                  <IconButton
                    onClick={() =>
                      setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1)
                    }
                    sx={{
                      ...navigationButtonStyles,
                      transform: 'rotate(270deg)',
                      flexShrink: 0,
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{ color: 'var(--main-color)' }}
                    />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>,
          document.body
        )}
    </Box>
  )
}
