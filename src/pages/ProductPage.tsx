// pages/ProductPage.tsx (ИСПРАВЛЕННАЯ версия с глобальным состоянием)
import { loadProductById } from '@/api/loadProducts'
import { Breadcrumbs } from '@/components/product/Breadcrumbs/Breadcrumbs'
import { ProductDetail } from '@/components/product/ProductDetail/ProductDetail'
import { clearCurrentProduct, clearError } from '@/context/slices/productSlice'
import { RootState } from '@/context/store'
import { Manufacturers } from '@/sections/ForMainPage/Manufacturers/Manufacturers'
import { RequestForm } from '@/sections/ForMainPage/RequestForm/RequestForm'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    currentProduct: product,
    productLoading: loading,
    error,
  } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    if (id) {
      dispatch(loadProductById(id) as any)
    }

    return () => {
      dispatch(clearCurrentProduct())
      dispatch(clearError())
    }
  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      document.title = `${product.product_name} - М'ясне обладнання`

      updateMetaTag(
        'description',
        `${product.product_name} від ${product.brands_names.brand_name}. Ціна: ${formatPrice(product.price)} ${product.currency_name?.currency_name || '₴'}`
      )
      updateMetaTag('og:title', product.product_name)
      updateMetaTag(
        'og:description',
        `${product.product_name} від ${product.brands_names.brand_name}`
      )
      updateMetaTag(
        'og:image',
        `${import.meta.env.VITE_API_PHOTO_URL}/${product.photo_url}`
      )
    }

    return () => {
      document.title = "М'ясне обладнання - Каталог"
      updateMetaTag(
        'description',
        "Професійне обладнання для м'ясопереробної промисловості"
      )
    }
  }, [product])

  // Обрабатываем ошибку 404
  useEffect(() => {
    if (error === 'Product not found') {
      navigate('/', { replace: true })
    }
  }, [error, navigate])

  const updateMetaTag = (name: string, content: string) => {
    const property = name.startsWith('og:') ? 'property' : 'name'
    let element = document.querySelector(`meta[${property}="${name}"]`)

    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(property, name)
      document.head.appendChild(element)
    }

    element.setAttribute('content', content)
  }

  const formatPrice = (price: number | string) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  if (loading) {
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
      style={{ padding: '0', maxWidth: '1200px', margin: '0 auto' }}
    >
      <Breadcrumbs productName={product.product_name} />
      <ProductDetail
        product={product}
        directusUrl={import.meta.env.VITE_API_BASE_URL}
      />
      <RequestForm />
      <Manufacturers />
    </motion.div>
  )
}
