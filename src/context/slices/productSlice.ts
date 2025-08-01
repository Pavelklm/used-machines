// context/slices/productSlice.ts (ОБНОВЛЕННЫЙ)
import { loadProductById, loadProducts } from '@/api/loadProducts'
import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/products'

interface ProductsState {
  products: Product[]
  currentProduct: Product | null
  loading: boolean
  productLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  productLoading: false,
  error: null,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error'
      })

      .addCase(loadProductById.pending, (state) => {
        state.productLoading = true
        state.error = null
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.productLoading = false
        state.currentProduct = action.payload
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.productLoading = false
        state.error = action.error.message || 'Product not found'
        state.currentProduct = null
      })
  },
})

export const { setProducts, setCurrentProduct, clearCurrentProduct } =
  productsSlice.actions

export default productsSlice.reducer
