import { Breadcrumbs } from '@/components/product/Breadcrumbs/Breadcrumbs'
import { ProductDetail } from '@/components/product/ProductDetail/ProductDetail'
import SimpleAnimatedSection from '@/components/ui/AnimatedSection/SimpleAnimatedSection'
import { useProductQuery } from '@/scripts/hooks/useProductsQuery'
import { Manufacturers } from '@/sections/ForMainPage/Manufacturers/Manufacturers'
import { RequestForm } from '@/sections/ForMainPage/RequestForm/RequestForm'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, error } = useProductQuery(id || '')
  
  useEffect(() => {
    if (error) {
      navigate('/', { replace: true })
    }
  }, [error, navigate])

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ padding: '2rem' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <div style={{ fontSize: '18px' }}>Завантаження...</div>
        </div>
      </motion.div>
    )
  }

  if (error || !product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ padding: '2rem' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <div style={{ color: '#f44336', fontSize: '18px' }}>
            Товар не знайдено
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '0',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '158px',
      }}
    >
      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <Breadcrumbs productName={product.product_name} />
      </SimpleAnimatedSection>

      <SimpleAnimatedSection direction='up' delay={0.1}>
        <ProductDetail
          product={product}
          directusUrl={import.meta.env.VITE_API_BASE_URL}
        />
      </SimpleAnimatedSection>

      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <RequestForm />
      </SimpleAnimatedSection>

      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <Manufacturers />
      </SimpleAnimatedSection>
    </motion.div>
  )
}

export default ProductPage
