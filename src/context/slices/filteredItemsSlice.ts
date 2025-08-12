import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Типы для фильтрованных элементов
interface FilteredItem {
  id: string | number
  currency?: string
  price: number
  product_name: string
  url: string
  equipment_name?: string
  brand_name?: string
  brand_image?: string | null
  category?: string
}

// Типизируем состояние слайса
interface FilteredItemsState {
  filteredItems: FilteredItem[]
  category: string
  activeEquipment: string
  activeScroll: boolean
}

// Типизированное начальное состояние
const initialState: FilteredItemsState = {
  filteredItems: [],
  category: '',
  activeEquipment: '',
  activeScroll: false,
}

export const filteredItemsSlice = createSlice({
  name: 'filteredItems',
  initialState,
  reducers: {
    setFilteredItems: (state, action: PayloadAction<FilteredItem[]>) => {
      state.filteredItems = action.payload
    },
    clearFilteredItems: (state) => {
      state.filteredItems = []
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setActiveEquipment: (state, action: PayloadAction<string>) => {
      state.activeEquipment = action.payload
    },
    setActiveScroll: (state, action: PayloadAction<boolean>) => {
      state.activeScroll = action.payload
    },
  },
})

export const {
  setFilteredItems,
  clearFilteredItems,
  setCategory,
  setActiveEquipment,
  setActiveScroll,
} = filteredItemsSlice.actions

// Экспортируем типы для использования в компонентах
export type { FilteredItem, FilteredItemsState }

export default filteredItemsSlice.reducer
