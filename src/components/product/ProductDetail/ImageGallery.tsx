import { setOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isModalOpen) return

    dispatch(setOverlay(true))
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1)
          }
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1)
          }
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
      dispatch(setOverlay(false))
    }
  }, [isModalOpen, currentImageIndex, images.length, setCurrentImageIndex])

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
  const visibleThumbnails = images.slice(thumbnailStartIndex, thumbnailEndIndex)

  const navigationButtonStyles = {
    width: '40px',
    height: '40px',
    border: '1px solid var(--blue-light-color)',
    borderRadius: '10px',
    '&:hover': { backgroundColor: 'var(--blue-light-color)' },
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
              setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
            }
            disabled={currentImageIndex === 0}
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
            {visibleThumbnails.map((image: string, index: number) => {
              const actualIndex = thumbnailStartIndex + index
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
                      filter: isActive ? 'brightness(1)' : 'brightness(0.4)',
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
                      image={`${directusUrl}assets/${image}`}
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
              setCurrentImageIndex(
                Math.min(images.length - 1, currentImageIndex + 1)
              )
            }
            disabled={currentImageIndex === images.length - 1}
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
      {isModalOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(8px)',
            background: 'rgba(43, 76, 126, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <Box
              sx={{
                maxWidth: 'auto',
                maxHeight: '100vh',
                '@keyframes zoomIn': {
                  '0%': { transform: 'scale(0.5)', opacity: 0 },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography
                variant='h6'
                sx={{
                  color: 'white',
                  backgroundColor: 'var(--main-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  width: '660px',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%)',
                  marginTop: '46px',
                  fontSize: '26px',
                  fontWeight: '400',
                }}
              >
                {productName}
              </Typography>

              <CardMedia
                component='img'
                image={`${directusUrl}assets/${images[currentImageIndex] || images[0]}`}
                alt={`${productName} - увеличено`}
                sx={{
                  position: 'absolute',
                  maxWidth: 'auto',
                  width: 'auto',
                  maxHeight: '70vh',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  objectFit: 'contain',
                  borderRadius: '20px',
                }}
              />

              {hasMultipleImages && (
                <Box
                  sx={{
                    display: 'flex',
                    position: 'absolute',
                    left: '50%',
                    bottom: '0',
                    transform: 'translate(-50%, -20%)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <IconButton
                    onClick={() =>
                      setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
                    }
                    disabled={currentImageIndex === 0}
                    sx={{
                      ...navigationButtonStyles,
                      transform: 'rotate(270deg)',
                    }}
                  >
                    <KeyboardArrowUpIcon sx={{ color: 'var(--main-color)' }} />
                  </IconButton>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '100%',
                      gap: '14px',
                      justifyContent: 'center',
                    }}
                  >
                    {visibleThumbnails.map((image: string, index: number) => {
                      const actualIndex = thumbnailStartIndex + index
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
                              filter: isActive
                                ? 'brightness(1)'
                                : 'brightness(0.4)',
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
                              image={`${directusUrl}assets/${image}`}
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
                      setCurrentImageIndex(
                        Math.min(images.length - 1, currentImageIndex + 1)
                      )
                    }
                    disabled={currentImageIndex === images.length - 1}
                    sx={{
                      ...navigationButtonStyles,
                      transform: 'rotate(270deg)',
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{ color: 'var(--main-color)' }}
                    />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
