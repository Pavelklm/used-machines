import { loadBrands } from '@/api/loadProducts'
import { BrandInfo, Product } from '@/types/products'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BrandsState {
  brands: BrandInfo[]
  loading: boolean
  error: string | null
}

const initialState: BrandsState = {
  brands: [],
  loading: false,
  error: null,
}

export const brandsSlice = createSlice({
  name: 'Brands',
  initialState,

  reducers: {
    setBrands: (state, action: PayloadAction<Product['brands_names'][]>) => {
      state.brands = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBrands.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadBrands.fulfilled, (state, action) => {
        state.loading = false
        state.brands = action.payload
      })
      .addCase(loadBrands.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error'
      })
  },
})

export const { setBrands } = brandsSlice.actions

export default brandsSlice.reducer
