import { loadProductById, loadProducts } from '@/api/loadProducts'
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

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    products,
    currentProduct: product,
    productLoading,
    loading: productsLoading,
    error,
  } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    if (!id) return

    if (products.length === 0) {
      dispatch(loadProducts() as any)
    } else {
      const foundProduct = products.find((p) => p.id === id)

      if (foundProduct) {
        if (!product || product.id !== id) {
          dispatch({
            type: 'products/setCurrentProduct',
            payload: foundProduct,
          })
        }
      } else {
        dispatch(loadProductById(id) as any)
      }
    }
  }, [id, products.length])

  useEffect(() => {
    return () => {
      dispatch(clearCurrentProduct())
      dispatch(clearError())
    }
  }, [])

  useEffect(() => {
    if (product) {
      document.title = `${product.product_name} - М'ясне обладнання`
    }
    return () => {
      document.title = "М'ясне обладнання - Каталог"
    }
  }, [product?.product_name])

  useEffect(() => {
    if (error === 'Product not found') {
      navigate('/', { replace: true })
    }
  }, [error])

  if (productsLoading || productLoading) {
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

export default ProductPage
