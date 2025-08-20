import MainButton from '@/components/module/MainButton/MainButton'
import { Product } from '@/types/products'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { formatPrice } from '../utils/productUtils'

interface ProductInfoProps {
  product: Product
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const price = formatPrice(product.price)
  const digits = price.split('')

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
                                opacity: 0.7,
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
