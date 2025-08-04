import MainButton from '@/components/module/MainButton/MainButton'
import { FormattedText } from '@/components/ui/FormattedText'
import { setOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { Product } from '@/types/products'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import {
  Box,
  Card,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import './style.css'

interface ProductDetailProps {
  product: Product
  directusUrl: string
}

// Утилиты
const getProductImages = (product: Product) => {
  const images = []

  if (product.photo_url) {
    images.push(product.photo_url)
  }

  if (product.all_photos && product.all_photos[0]) {
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

const formatPrice = (price: number) => {
  return Math.floor(price || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Компоненты
const ImageGallery = ({
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
                        ? '2px solid var(--main-color)'
                        : '1px solid var(--blue-light-color)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      background: isActive
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
            sx={{ ...navigationButtonStyles, mt: 1 }}
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

      {/* Modal с увеличенной картинкой */}
      {isModalOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
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
              maxWidth: '95vw',
              maxHeight: '95vh',
              animation: 'zoomIn 0.3s ease',
              '@keyframes zoomIn': {
                '0%': { transform: 'scale(0.5)', opacity: 0 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardMedia
              component='img'
              image={`${directusUrl}assets/${images[currentImageIndex] || images[0]}`}
              alt={`${productName} - увеличено`}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            />

            {/* Кнопка закрытия */}
            <IconButton
              onClick={() => setIsModalOpen(false)}
              sx={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Навигация в модали */}
            {hasMultipleImages && (
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
                  }}
                  disabled={currentImageIndex === 0}
                  sx={{
                    position: 'absolute',
                    left: '-60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                    '&:disabled': { opacity: 0.3 },
                  }}
                >
                  <ChevronLeftIcon sx={{ fontSize: '32px' }} />
                </IconButton>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(
                      Math.min(images.length - 1, currentImageIndex + 1)
                    )
                  }}
                  disabled={currentImageIndex === images.length - 1}
                  sx={{
                    position: 'absolute',
                    right: '-60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                    '&:disabled': { opacity: 0.3 },
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: '32px' }} />
                </IconButton>
              </>
            )}

            {/* Подсказка по клавишам */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '12px',
                color: '#666',
                whiteSpace: 'nowrap',
                opacity: 0.8,
              }}
            >
              <Typography sx={{ fontSize: '12px', color: '#666' }}>
                {hasMultipleImages ? '← → навигація • ' : ''}ESC закрити
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

const ProductInfo = ({ product }: { product: Product }) => {
  const price = formatPrice(product.price)
  const digits = price.split('')

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ width: '100%' }}
    >
      <Box
        sx={{
          height: '500px',
          width: '100%',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.6rem', md: '2rem' },
            lineHeight: 1.2,
            background:
              'linear-gradient(135deg, #1a1a2e 0%, #16213e 80%, var(--main-color) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            textAlign: 'center',
          }}
        >
          {product.product_name}
        </Typography>

        <Typography
          variant='body1'
          sx={{
            color: '#6c757d',
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 400,
            mb: 3,
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          {product.teaser}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '16px 24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.12),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                  `,
                }}
              >
                {/* Анимация цифр по одной */}
                <Box sx={{ display: 'flex', whiteSpace: 'pre' }}>
                  {digits.map((digit, index) => (
                    <Typography
                      key={`price-${index}`}
                      sx={{
                        color: 'var(--main-color)',
                        fontSize: '28px',
                        fontWeight: 700,
                        lineHeight: '32px',
                        textShadow:
                          '0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)',
                        fontVariantNumeric: 'tabular-nums',
                        opacity: 0,
                        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`,
                        whiteSpace: 'pre', // Сохраняем пробелы
                        '@keyframes fadeInUp': {
                          '0%': { opacity: 0, transform: 'translateY(10px)' },
                          '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                      }}
                    >
                      {digit}
                    </Typography>
                  ))}
                </Box>
                <Typography
                  sx={{
                    color: 'rgba(26, 26, 46, 0.7)',
                    fontWeight: 600,
                    fontSize: '18px',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out ${digits.length * 0.05 + 0.2}s forwards`,
                    '@keyframes fadeIn': {
                      '0%': { opacity: 0 },
                      '100%': { opacity: 1 },
                    },
                  }}
                >
                  {product.currency_name?.currency_name || '₴'}
                </Typography>
              </Box>
            </motion.div>
          </Box>

          <MainButton />
        </Box>
      </Box>
    </motion.div>
  )
}

const TabButton = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}) => (
  <Box
    onClick={onClick}
    sx={{
      padding: '16px 32px',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: isActive
        ? 'var(--main-color)'
        : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
      color: isActive ? '#ffffff' : '#6c757d',
      fontWeight: 600,
      fontSize: '1.1rem',
      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
      '&:hover': {
        background: isActive ? 'var(--main-color)' : 'var(--blue-bright-color)',
        color: '#ffffff',
        transform: 'translateY(-2px)',
      },
    }}
  >
    {children}
  </Box>
)

const Characteristics = ({ product }: { product: Product }) => {
  if (!product.characteristics || !product.characteristics[0]) return null

  const items = [
    { key: 'Бренд', value: product.brands_names.brand_name },
    { key: 'Категорія', value: product.categories_names.categorie_name },
    { key: 'Обладнання', value: product.equipments_names.equipment_name },
    ...product.characteristics.map((item) => ({
      key: item.characteristic,
      value: item.value,
    })),
  ]

  return (
    <>
      {items.map(({ key, value }) => (
        <Box
          key={key}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: '20px',
            gap: '10px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              color: 'var(--main-color)',
              minWidth: 'fit-content',
            }}
            variant='body1'
          >
            {key}
          </Typography>

          <Box
            sx={{
              height: 0,
              border: '1px solid rgb(178, 200, 227)',
              flexGrow: 1,
            }}
          />

          <Chip
            label={value}
            sx={{
              justifyContent: 'flex-start',
              color: '#000',
              backgroundColor: '#fff',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '19px',
              height: '36px',
              borderRadius: '18px',
              width: '350px',
              flexShrink: 0,
              '& .MuiChip-label': {
                paddingLeft: 0,
                paddingRight: 0,
              },
            }}
          />
        </Box>
      ))}
    </>
  )
}

const tabContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '800px',
}

const tabPanelStyles = {
  display: 'flex',
  flexDirection: 'column',
  p: '40px',
  borderRadius: '20px',
  border: '1px solid rgb(178, 200, 227)',
  transition: 'all 0.3s ease',
  height: '380px',
  overflowY: 'auto',
  overflowX: 'hidden',
}

const tabPanelStylesSpaceBetween = {
  ...tabPanelStyles,
  justifyContent: 'space-between', // Только для характеристик
}

export const ProductDetail = ({ product, directusUrl }: ProductDetailProps) => {
  const images = getProductImages(product)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs')

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
        <ImageGallery
          images={images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          directusUrl={directusUrl}
          productName={product.product_name}
          brandName={product.brands_names.brand_name}
        />

        <Box sx={{ display: 'flex' }}>
          <ProductInfo product={product} />
        </Box>
      </Box>

      <Box sx={{ mt: '150px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: '40px',
            justifyContent: 'center',
          }}
        >
          <TabButton
            isActive={activeTab === 'specs'}
            onClick={() => setActiveTab('specs')}
          >
            Характеристика
          </TabButton>
          <TabButton
            isActive={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            Опис обладнання
          </TabButton>
        </Box>

        <Box sx={{ height: '420px' }}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'specs' ? (
              <Box sx={tabContentStyles}>
                <Box sx={tabPanelStylesSpaceBetween}>
                  <Characteristics product={product} />
                </Box>
              </Box>
            ) : (
              <Box sx={tabContentStyles}>
                <Box sx={tabPanelStyles}>
                  <FormattedText raw={product.description} />
                </Box>
              </Box>
            )}
          </motion.div>
        </Box>
      </Box>
    </>
  )
}
