import { fetchBrands, fetchProductById, fetchProducts } from '@/api/cards'
import { Product } from '@/types/products'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (_, thunkAPI) => {
    const data = await fetchProducts()
    return data
  }
)

export const loadBrands = createAsyncThunk<Product['brands_names'][], void>(
  'products/loadBrands',
  async () => {
    const brandsData = await fetchBrands()

    const brandsMap = new Map<string, Product['brands_names']>()

    brandsData.forEach((item: any) => {
      const brand = item.brands_names
      if (brand?.brand_name && !brandsMap.has(brand.brand_name)) {
        brandsMap.set(brand.brand_name, brand)
      }
    })

    return Array.from(brandsMap.values())
  }
)

export const loadProductById = createAsyncThunk<Product, string>(
  'products/loadProductById',
  async (productId: string, thunkAPI) => {
    try {
      const data = await fetchProductById(productId)
      if (!data) {
        throw new Error('Product not found')
      }
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
)
