import { fetchProducts } from '@/api/cards'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (_, thunkAPI) => {
    const data = await fetchProducts()
    return data
  }
)
