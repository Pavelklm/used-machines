import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useImageModal } from '../../hooks/useImageModal'
import { MODAL_SIZES } from './constants'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  productName: string
  hasMultipleImages: boolean
  visibleThumbnails: Array<{ image: string; index: number }>
}

export const ImageModal = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  setCurrentImageIndex,
  productName,
  hasMultipleImages,
  visibleThumbnails,
}: ImageModalProps) => {
  useImageModal({
    isOpen,
    onClose,
    images,
    currentImageIndex,
    setCurrentImageIndex,
  })

  // Адаптивные размеры только для модалки
  const adaptiveSizes = useMemo(() => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const scaleX = windowWidth / MODAL_SIZES.BASE_WIDTH
    const scaleY = windowHeight / MODAL_SIZES.BASE_HEIGHT

    // Используем среднее значение для более сбалансированного масштабирования
    const scale = Math.max(0.8, (scaleX + scaleY) / 2) // минимальный коэффициент 0.8

    // Адаптивная высота в зависимости от соотношения сторон
    const aspectRatio = windowWidth / windowHeight
    let heightPercentage = 0.7 // базовый процент для широких экранов
    
    if (aspectRatio < 0.75) { // очень узкие экраны (телефоны портрет)
      heightPercentage = 0.5
    } else if (aspectRatio < 1.2) { // планшеты портрет
      heightPercentage = 0.6
    }

    return {
      textFontSize: Math.round(MODAL_SIZES.TEXT_FONT_SIZE * scale),
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
      iconSize: Math.round(MODAL_SIZES.ICON_SIZE * scale),
      imageBorderRadius: Math.round(MODAL_SIZES.IMAGE_BORDER_RADIUS * scale),
      hoverTranslate: Math.round(MODAL_SIZES.HOVER_TRANSLATE * scale),
      navigationGap: Math.round(MODAL_SIZES.NAVIGATION_GAP * scale),
      mainImageMaxHeight: Math.round(windowHeight * heightPercentage),
      mainContainerGap: Math.round(16 * scale),
      thumbnailsGap: Math.round(14 * scale),
    }
  }, [])

  const modalHoverAnimation = {
    translateY: `-${adaptiveSizes.hoverTranslate}px`,
  }

  const handlePrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    )
  }

  if (!isOpen) return null

  return createPortal(
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
        // НЕ останавливаем propagation на главном контейнере - пусть клики по пустым зонам закрывают модалку
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: `${adaptiveSizes.mainContainerGap}px`,
          maxWidth: '95vw',
          maxHeight: '95vh',
        }}
      >
        {/* Название товара */}
        <Typography
          variant='h6'
          onClick={(e) => e.stopPropagation()} // Останавливаем propagation на названии
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
          onClick={(e) => e.stopPropagation()} // Останавливаем propagation на картинке
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: `${adaptiveSizes.mainImageMaxHeight}px`,
          }}
        >
          <CardMedia
            component='img'
            image={images[currentImageIndex] || images[0]}
            alt={`${productName} - увеличено`}
            sx={{
              width: 'auto',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain', // показываем всю картинку без обрезки
              borderRadius: `${adaptiveSizes.imageBorderRadius}px`,
            }}
          />
        </Box>

        {/* Навигация с миниатюрами */}
        {hasMultipleImages && (
          <Box
            onClick={(e) => e.stopPropagation()} // Останавливаем propagation на блоке навигации
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: `${adaptiveSizes.navigationGap}px`,
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={handlePrevious}
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
                gap: `${adaptiveSizes.thumbnailsGap}px`,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {visibleThumbnails.map((thumbnail, index) => {
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
                        boxShadow: 'none',
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
                        image={thumbnail.image}
                        alt={`${productName} - зображення ${actualIndex + 1}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          backgroundColor: '#f5f5f5',
                        }}
                      />
                    </Card>
                  </motion.div>
                )
              })}
            </Box>

            <IconButton
              onClick={handleNext}
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
    </Box>,
    document.body
  )
}
