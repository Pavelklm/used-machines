// ПРОСТОЕ РЕШЕНИЕ: Заменить Grid на Box с Flexbox
// components/product/ProductDetail/ProductDetail.tsx

import { Product } from '@/types/products'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './style.css'

interface ProductDetailProps {
  product: Product
  directusUrl: string
}

export const ProductDetail = ({ product, directusUrl }: ProductDetailProps) => {
  const navigate = useNavigate()

  const formatPrice = (price: number | string) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  const handleBackToCatalog = () => {
    navigate('/')
  }

  return (
    <Box
      className='container product-detail'
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row', padding: '0' },
        gap: 4,
        alignItems: 'flex-start',
      }}
    >
      {/* Изображение товара */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          maxWidth: { xs: '100%', md: '50%' },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              borderRadius: '10px',
              boxShadow: '0 0 0 1px var(--blue-light-color)',
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component='img'
              image={`${directusUrl}assets/${product.photo_url}`}
              alt={product.product_name}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
              loading='eager'
            />
          </Card>
        </motion.div>
      </Box>

      {/* Информация о товаре */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          maxWidth: { xs: '100%', md: '50%' },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {/* Весь остальной код остается ТОЧНО таким же */}
            {/* Заголовок и цена */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant='h4'
                component='h1'
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: 'var(--text-color)',
                }}
              >
                {product.product_name}
              </Typography>

              <Typography
                variant='h5'
                sx={{
                  color: 'var(--main-color)',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {formatPrice(product.price)}{' '}
                {product.currency_name?.currency_name || '₴'}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Характеристики */}
            <Box sx={{ mb: 4, flexGrow: 1 }}>
              <Typography
                variant='h6'
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: 'var(--text-color)',
                }}
              >
                Характеристики
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant='body2'
                    sx={{ color: 'var(--text-secondary)', minWidth: '120px' }}
                  >
                    Бренд:
                  </Typography>
                  <Chip
                    label={product.brands_names.brand_name}
                    size='small'
                    sx={{
                      backgroundColor: 'var(--blue-light-color)',
                      color: 'var(--main-color)',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant='body2'
                    sx={{ color: 'var(--text-secondary)', minWidth: '120px' }}
                  >
                    Категорія:
                  </Typography>
                  <Chip
                    label={product.categories_names.categorie_name}
                    size='small'
                    variant='outlined'
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant='body2'
                    sx={{ color: 'var(--text-secondary)', minWidth: '120px' }}
                  >
                    Тип обладнання:
                  </Typography>
                  <Chip
                    label={product.equipments_names.equipment_name}
                    size='small'
                    variant='outlined'
                  />
                </Box>
              </Box>
            </Box>

            {/* Кнопки действий */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ flex: 1 }}
              >
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: '16px',
                    fontWeight: 500,
                    borderRadius: '10px',
                    backgroundColor: 'var(--main-color)',
                    '&:hover': {
                      backgroundColor: 'var(--blue-bright-color)',
                    },
                  }}
                >
                  Замовити консультацію
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ flex: 1 }}
              >
                <Button
                  variant='outlined'
                  fullWidth
                  onClick={handleBackToCatalog}
                  sx={{
                    py: 1.5,
                    fontSize: '16px',
                    fontWeight: 500,
                    borderRadius: '10px',
                    borderColor: 'var(--blue-light-color)',
                    color: 'var(--text-color)',
                    '&:hover': {
                      borderColor: 'var(--main-color)',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  Повернутися до каталогу
                </Button>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  )
}
