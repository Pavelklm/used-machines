import { LineBackground } from '@/components/module/LineBackground/LineBackground'
import { useScreenSize } from '@/scripts/hooks/useScreenSize'
import { FormattedText } from '@/scripts/utils/FormattedText/FormattedText'
import { Product } from '@/types/products'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Characteristics } from './components/Characteristics'
import { ProductInfo } from './components/ProductInfo'
import { TabButton } from './components/TabButton'
import {
  TAB_CONTENT_STYLES,
  TAB_NAVIGATION_STYLES,
  TAB_PANEL_STYLES,
  TAB_PANEL_STYLES_SPACE_BETWEEN,
} from './constants/styles'
import { ImageGallery } from './ImageGallery'
import { getProductImages } from './utils/productUtils'

interface ProductDetailProps {
  product: Product
  directusUrl: string
}

type TabType = 'specs' | 'description'

export const ProductDetail = ({ product, directusUrl }: ProductDetailProps) => {
  const images = getProductImages(product)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabType>('specs')
  const { isTablet } = useScreenSize()

  return (
    <>
      <Box
        className='product-detail'
        sx={{
          display: 'flex',
          flexDirection: {
            md: 'column',
            xl: 'row',
            lg: 'row',
            sm: 'column',
            xs: 'column',
          },
          alignItems: {
            xl: 'flex-start',
            lg: 'flex-start',
            md: 'flex-start',
            sm: 'center',
            xs: 'center',
          },
          gap: '20px',
        }}
      >
        <ImageGallery
          images={images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          productName={product.product_name}
          brandName={product.brands_names.brand_name}
        />

        <Box sx={{ display: 'flex' }}>
          <ProductInfo product={product} />
        </Box>
      </Box>

      <Box sx={{ mt: '150px', position: 'relative' }}>
        <LineBackground className='full-width-line-product-detail' />

        <Box sx={TAB_NAVIGATION_STYLES}>
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
            {isTablet ? 'Опис' : 'Опис обладнання'}
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
              <Box sx={TAB_CONTENT_STYLES}>
                <Box sx={TAB_PANEL_STYLES_SPACE_BETWEEN}>
                  <Characteristics product={product} />
                </Box>
              </Box>
            ) : (
              <Box sx={TAB_CONTENT_STYLES}>
                <Box sx={TAB_PANEL_STYLES}>
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
