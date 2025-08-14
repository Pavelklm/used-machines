import { LineBackground } from '@/components/module/LineBackground/LineBackground'
import MainButton from '@/components/module/MainButton/MainButton'
import { FormattedText } from '@/components/ui/FormattedText/FormattedText'
import { Product } from '@/types/products'
import { Box, Chip, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { ImageGallery } from './ImageGallery'

interface ProductDetailProps {
  product: Product
  directusUrl: string
}

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

const formatPriceWithGroups = (price: number) => {
  const numStr = Math.floor(price || 0).toString()
  const groups = []

  for (let i = numStr.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3)
    groups.unshift(numStr.slice(start, i))
  }

  return groups
}

const ProductInfo = ({ product }: { product: Product }) => {
  const price = formatPrice(product.price)
  const digits = price.split('')

  // Считаем только цифры для синхронизации валюты
  const digitCount = digits.filter((char) => char !== ' ').length

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
          borderRadius: '20px',
          padding: '32px',
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
            textAlign: 'flex-start',
          }}
        >
          {product.product_name}
        </Typography>

        <Typography
          variant='body1'
          sx={{
            color: 'var(--main-color)',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '19px',
            mb: 3,
            fontStyle: 'italic',
            textAlign: 'flex-start',
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
                }}
              >
                <Box sx={{ display: 'flex', whiteSpace: 'pre' }}>
                  {digits.map((digit, index) => {
                    // Считаем только цифры для задержки
                    const digitIndex =
                      digits.slice(0, index + 1).filter((char) => char !== ' ')
                        .length - 1
                    const isDigit = digit !== ' '

                    return (
                      <Typography
                        key={`price-${index}`}
                        sx={{
                          color: 'var(--main-color)',
                          fontSize: '26px',
                          fontWeight: '400',
                          lineHeight: '32px',
                          fontVariantNumeric: 'tabular-nums',
                          whiteSpace: 'pre',
                          ...(isDigit
                            ? {
                                opacity: 0,
                                animation: `fadeInUp 0.5s ease-out ${digitIndex * 0.08}s forwards`,
                                '@keyframes fadeInUp': {
                                  '0%': {
                                    opacity: 0,
                                    transform: 'translateY(10px)',
                                  },
                                  '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                  },
                                },
                              }
                            : {
                                opacity: 0.7, // Пробелы статичны но немного прозрачны
                              }),
                        }}
                      >
                        {digit}
                      </Typography>
                    )
                  })}
                </Box>
                <Typography
                  sx={{
                    color: 'var(--main-color)',
                    fontSize: '26px',
                    fontWeight: '400',
                    opacity: 0,
                    // Валюта появляется чуть после последней цифры
                    animation: `fadeInUp 0.5s ease-out ${(digitCount - 1) * 0.08 + 0.1}s forwards`,
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(10px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
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
      padding: '20px 40px 35px 40px',
      width: '100%',
      height: '68px',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '15px 15px 0 0',
      cursor: 'pointer',
      background: isActive ? '#ffffff' : 'transparent',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      transition: 'background-color 0.15s ease-out',
      color: isActive ? 'var(--main-color)' : '#ffffff',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '21px',
      border: 'none',
      alignItems: 'flex-start',
      zIndex: isActive ? 2 : 1,
      '&:hover': {
        background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
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
            alignItems: 'flex-end',
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
              alignItems: 'flex-end',
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
  marginBottom: '150px',
}

const tabPanelStylesSpaceBetween = {
  ...tabPanelStyles,
  justifyContent: 'space-between',
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

      <Box sx={{ mt: '150px', position: 'relative' }}>
        <LineBackground className='full-width-line-product-detail' />
        <Box
          sx={{
            display: 'flex',
            mb: '40px',
            width: '480px',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            height: '75px',
            position: 'relative',
            gap: '10px',
            zIndex: 1,
            overflow: 'visible',
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

        <Box sx={{ height: '100%', marginTop: '20px' }}>
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
