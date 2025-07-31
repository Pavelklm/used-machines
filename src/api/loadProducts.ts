import { fetchBrands, fetchProducts } from '@/api/cards'
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
    const data = await fetchBrands()

    data.forEach(
      ({ brands_names }: { brands_names: Product['brands_names'] }) => {
        const key = brands_names?.brand_name
        if (key && !data.has(key)) data.set(key, brands_names)
      }
    )

    return Array.from(data.values())
  }
)
