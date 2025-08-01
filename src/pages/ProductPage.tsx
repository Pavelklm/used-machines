// pages/ProductPage.tsx (ИСПРАВЛЕННАЯ версия)
import { Breadcrumbs } from '@/components/product/Breadcrumbs/Breadcrumbs'
import { ProductDetail } from '@/components/product/ProductDetail/ProductDetail'
import { Manufacturers } from '@/sections/ForMainPage/Manufacturers/Manufacturers'
import { RequestForm } from '@/sections/ForMainPage/RequestForm/RequestForm'
import { Product } from '@/types/products'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
  }, [id])

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

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true)
      setError(null)

      const token = import.meta.env.VITE_API_TOKEN

      if (!token) {
        throw new Error('API token not found')
      }

      const baseUrl = 'https://admin.hornsandhooves.pp.ua'
      const productUrl = `${baseUrl}/items/products/${productId}?fields=*,brands_names.*,categories_names.*,equipments_names.*,currency_name.*`

      const response = await fetch(productUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          navigate('/', { replace: true })
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setProduct(data.data)
    } catch (err) {
      console.error('Error fetching product:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
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
            {error && 'Товар не знайдено'}
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
