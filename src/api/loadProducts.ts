import { fetchProductById, fetchProducts } from '@/api/cards'
import { Product } from '@/types/products'
import { createAsyncThunk } from '@reduxjs/toolkit'

let isProductsLoading = false

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (_, thunkAPI) => {
    if (isProductsLoading) {
      return []
    }

    const cached = localStorage.getItem('products_cache')
    const cacheTime = localStorage.getItem('products_cache_time')

    if (cached && cacheTime) {
      const age = Date.now() - parseInt(cacheTime)
      if (age < 1 * 60 * 1000) {
        return JSON.parse(cached)
      }
    }

    isProductsLoading = true

    try {
      const data = await fetchProducts()
      localStorage.setItem('products_cache', JSON.stringify(data))
      localStorage.setItem('products_cache_time', Date.now().toString())
      return data
    } finally {
      isProductsLoading = false
    }
  }
)

export const loadProductById = createAsyncThunk<Product, string>(
  'products/loadProductById',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const products = state.products.products

      if (products.length > 0) {
        const cachedProduct = products.find((p: Product) => p.id === productId)
        if (cachedProduct) {
          return cachedProduct
        }
      }

      const cached = localStorage.getItem('products_cache')
      const cacheTime = localStorage.getItem('products_cache_time')

      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime)
        if (age < 1 * 60 * 1000) {
          const cachedProducts = JSON.parse(cached)
          const cachedProduct = cachedProducts.find(
            (p: Product) => p.id === productId
          )
          if (cachedProduct) {
            return cachedProduct
          }
        }
      }

      const data = await fetchProductById(productId)
      if (!data) {
        throw new Error('Product not found')
      }
      return data
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
)
