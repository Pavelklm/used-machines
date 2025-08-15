import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
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
  const MODAL_SIZES = {
    BASE_WIDTH: 1920,
    BASE_HEIGHT: 830,
    TEXT_FONT_SIZE: 26,
    TEXT_PADDING_VERTICAL: 10,
    TEXT_PADDING_HORIZONTAL: 30,
    TEXT_BORDER_RADIUS: 5,
    THUMBNAIL_SIZE: 83,
    THUMBNAIL_BORDER_RADIUS: 8,
    THUMBNAIL_BORDER_WIDTH: 2,
    BUTTON_SIZE: 40,
    BUTTON_PADDING: 8,
    BUTTON_BORDER_RADIUS: 6,
    BUTTON_BORDER_WIDTH: 1,
    ICON_SIZE: 24,
    IMAGE_BORDER_RADIUS: 12,
    HOVER_TRANSLATE: 2,
    NAVIGATION_GAP: 10, // gap между элементами навигации
  }

  useEffect(() => {
    if (!isModalOpen) return

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
          setCurrentImageIndex(
            currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setCurrentImageIndex(
            currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
          )
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
      document.body.style.overflow = originalOverflow || 'auto'
      document.body.style.position = originalPosition || 'static'
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isModalOpen, currentImageIndex, images.length, setCurrentImageIndex])

  const getThumbnailRange = () => {
    if (images.length <= maxVisibleThumbnails) {
      return {
        start: 0,
        end: images.length,
        indices: Array.from({ length: images.length }, (_, i) => i),
      }
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
  const visibleThumbnails = visibleIndices.map((index) => ({
    image: images[index],
    index,
  }))

  const navigationButtonStyles = {
    width: '40px',
    height: '40px',
    border: '1px solid var(--blue-light-color)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '8px',
    '&:hover': {
      backgroundColor: 'var(--blue-bright-color)',
      '& .MuiSvgIcon-root': {
        color: '#fff',
      },
    },
    '&:disabled': { opacity: 0.3 },
  }

  const buttonHoverAnimation = { translateY: '-2px' }

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
              setCurrentImageIndex(
                currentImageIndex === 0
                  ? images.length - 1
                  : currentImageIndex - 1
              )
            }
            sx={{ ...navigationButtonStyles, mb: 1 }}
            component={motion.button}
            whileHover={buttonHoverAnimation}
          >
            <KeyboardArrowUpIcon
              sx={{
                color: 'var(--main-color)',
                fontSize: '24px',
              }}
            />
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
                  whileHover={buttonHoverAnimation}
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
                            borderRadius: '8px',
                          }
                        : {},
                      borderRadius: '8px',
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
              setCurrentImageIndex(
                currentImageIndex === images.length - 1
                  ? 0
                  : currentImageIndex + 1
              )
            }
            sx={{ ...navigationButtonStyles }}
            component={motion.button}
            whileHover={buttonHoverAnimation}
          >
            <KeyboardArrowDownIcon
              sx={{
                color: 'var(--main-color)',
                fontSize: '24px',
              }}
            />
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

      {/* Модалка с адаптивными размерами */}
      {isModalOpen &&
        createPortal(
          <ModalContent
            onClose={() => setIsModalOpen(false)}
            images={images}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            directusUrl={directusUrl}
            productName={productName}
            hasMultipleImages={hasMultipleImages}
            visibleThumbnails={visibleThumbnails}
            MODAL_SIZES={MODAL_SIZES}
          />,
          document.body
        )}
    </Box>
  )
}

const ModalContent = ({
  onClose,
  images,
  currentImageIndex,
  setCurrentImageIndex,
  directusUrl,
  productName,
  hasMultipleImages,
  visibleThumbnails,
  MODAL_SIZES,
}: {
  onClose: () => void
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  directusUrl: string
  productName: string
  hasMultipleImages: boolean
  visibleThumbnails: any[]
  MODAL_SIZES: any
}) => {
  // Адаптивные размеры только для модалки
  const adaptiveSizes = useMemo(() => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const scaleX = windowWidth / MODAL_SIZES.BASE_WIDTH
    const scaleY = windowHeight / MODAL_SIZES.BASE_HEIGHT
    const scale = Math.min(scaleX, scaleY)

    return {
      textFontSize: Math.round(MODAL_SIZES.TEXT_FONT_SIZE * scale),
      textHeight: Math.round(MODAL_SIZES.TEXT_HEIGHT * scale),
      textPaddingVertical: Math.round(
        MODAL_SIZES.TEXT_PADDING_VERTICAL * scale
      ),
      textPaddingHorizontal: Math.round(
        MODAL_SIZES.TEXT_PADDING_HORIZONTAL * scale
      ),
      textBorderRadius: Math.round(MODAL_SIZES.TEXT_BORDER_RADIUS * scale),
      thumbnailSize: Math.round(MODAL_SIZES.THUMBNAIL_SIZE * scale),
      thumbnailBorderRadius: Math.round(
        MODAL_SIZES.THUMBNAIL_BORDER_RADIUS * scale
      ),
      thumbnailBorderWidth: Math.round(
        MODAL_SIZES.THUMBNAIL_BORDER_WIDTH * scale
      ),
      buttonSize: Math.round(MODAL_SIZES.BUTTON_SIZE * scale),
      buttonPadding: Math.round(MODAL_SIZES.BUTTON_PADDING * scale),
      buttonBorderRadius: Math.round(MODAL_SIZES.BUTTON_BORDER_RADIUS * scale),
      buttonBorderWidth: Math.round(MODAL_SIZES.BUTTON_BORDER_WIDTH * scale),
      iconSize: Math.round(MODAL_SIZES.ICON_SIZE * scale),
      imageBorderRadius: Math.round(MODAL_SIZES.IMAGE_BORDER_RADIUS * scale),
      hoverTranslate: Math.round(MODAL_SIZES.HOVER_TRANSLATE * scale),
      navigationGap: Math.round(MODAL_SIZES.NAVIGATION_GAP * scale),
      mainImageMaxHeight: Math.round(windowHeight * 0.7),
    }
  }, [MODAL_SIZES])

  // Адаптивная hover анимация для модалки
  const modalHoverAnimation = {
    translateY: `-${adaptiveSizes.hoverTranslate}px`,
  }

  return (
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
      }}
      onClick={onClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: `${Math.round(16 * (window.innerWidth / MODAL_SIZES.BASE_WIDTH))}px`,
          maxWidth: '95vw',
          maxHeight: '95vh',
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
            borderRadius: `${adaptiveSizes.textBorderRadius}px`,
            fontSize: `${adaptiveSizes.textFontSize}px`,
            fontWeight: '400',
            padding: `${adaptiveSizes.textPaddingVertical}px ${adaptiveSizes.textPaddingHorizontal}px`,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
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
            height: `${adaptiveSizes.mainImageMaxHeight}px`,
          }}
        >
          <CardMedia
            component='img'
            image={`${directusUrl}assets/${images[currentImageIndex] || images[0]}`}
            alt={`${productName} - увеличено`}
            sx={{
              width: 'auto',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: `${adaptiveSizes.imageBorderRadius}px`,
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
              gap: `${adaptiveSizes.navigationGap}px`,
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={() =>
                setCurrentImageIndex(
                  currentImageIndex === 0
                    ? images.length - 1
                    : currentImageIndex - 1
                )
              }
              sx={{
                width: `${adaptiveSizes.buttonSize}px`,
                height: `${adaptiveSizes.buttonSize}px`,
                padding: `${adaptiveSizes.buttonPadding}px`,
                borderRadius: `${adaptiveSizes.buttonBorderRadius}px`,
                backgroundColor: '#fff',
                transform: 'rotate(270deg)',
                flexShrink: 0,
                '&:hover': {
                  backgroundColor: 'var(--blue-bright-color)',
                  '& .MuiSvgIcon-root': {
                    color: '#fff',
                  },
                },
                '&:disabled': { opacity: 0.3 },
              }}
            >
              <KeyboardArrowUpIcon
                sx={{
                  color: 'var(--main-color)',
                  fontSize: `${adaptiveSizes.iconSize}px`,
                }}
              />
            </IconButton>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: `${Math.round(14 * (window.innerWidth / MODAL_SIZES.BASE_WIDTH))}px`,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {visibleThumbnails.map((thumbnail, index: number) => {
                const actualIndex = thumbnail.index
                const isActive = currentImageIndex === actualIndex

                return (
                  <motion.div
                    key={actualIndex}
                    whileHover={modalHoverAnimation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card
                      onClick={() => setCurrentImageIndex(actualIndex)}
                      sx={{
                        width: `${adaptiveSizes.thumbnailSize}px`,
                        height: `${adaptiveSizes.thumbnailSize}px`,
                        cursor: 'pointer',
                        border: isActive
                          ? `${adaptiveSizes.thumbnailBorderWidth}px solid var(--blue-bright-color)`
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
                              border: 'none',
                              zIndex: 1,
                              borderRadius: `${adaptiveSizes.thumbnailBorderRadius}px`,
                            }
                          : {},
                        borderRadius: `${adaptiveSizes.thumbnailBorderRadius}px`,
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        '&:hover': {
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
                setCurrentImageIndex(
                  currentImageIndex === images.length - 1
                    ? 0
                    : currentImageIndex + 1
                )
              }
              sx={{
                width: `${adaptiveSizes.buttonSize}px`,
                height: `${adaptiveSizes.buttonSize}px`,
                padding: `${adaptiveSizes.buttonPadding}px`,
                borderRadius: `${adaptiveSizes.buttonBorderRadius}px`,
                backgroundColor: '#fff',
                transform: 'rotate(270deg)',
                flexShrink: 0,
                '&:hover': {
                  backgroundColor: 'var(--blue-bright-color)',
                  '& .MuiSvgIcon-root': {
                    color: '#fff',
                  },
                },
                '&:disabled': { opacity: 0.3 },
              }}
            >
              <KeyboardArrowDownIcon
                sx={{
                  color: 'var(--main-color)',
                  fontSize: `${adaptiveSizes.iconSize}px`,
                }}
              />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  )
}
