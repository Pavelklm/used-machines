import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  clearFilteredItems,
  setActiveEquipment,
  setActiveScroll,
  setCategory,
  type FilteredItem,
} from '@/context/slices/filteredItemsSlice'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'

const ALL_PRODUCTS = 'Уся продукція' as const

interface FilterState {
  activeCategory: string | null
  selectedItem: string
}

interface UseFiltersProps {
  catalogDataByCategory: Record<string, string[]>
  getFilteredProducts: (name: string) => FilteredItem[]
  setFilteredItems: (items: FilteredItem[]) => void
  onShowAllProducts?: () => void
}

export function useFilters({
  catalogDataByCategory,
  getFilteredProducts,
  setFilteredItems,
  onShowAllProducts,
}: UseFiltersProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    activeCategory: null,
    selectedItem: ALL_PRODUCTS,
  })

  const dispatch = useAppDispatch()

  // Мемоизируем обратный индекс item -> category для оптимизации
  const itemToCategoryMap = useMemo(() => {
    const map: Record<string, string> = {}
    Object.entries(catalogDataByCategory).forEach(([category, items]) => {
      items.forEach((item) => {
        map[item] = category
      })
    })
    return map
  }, [catalogDataByCategory])

  // Селекторы для восстановления состояния фильтров
  const category = useAppSelector((state) => state.filteredItems.category)
  const equipment = useAppSelector((state) => state.filteredItems.activeEquipment)
  const filteredItems = useAppSelector((state) => state.filteredItems.filteredItems)
  const activeScroll = useAppSelector((state) => state.filteredItems.activeScroll)

  // Восстановление состояния
  useEffect(() => {
    if (activeScroll && category && equipment) {
      setFilterState({
        activeCategory: category,
        selectedItem: equipment,
      })
      dispatch(setActiveScroll(false))

      const filtered = getFilteredProducts(equipment)
      if (JSON.stringify(filtered) !== JSON.stringify(filteredItems)) {
        setFilteredItems(filtered)
      }
    }
  }, [
    activeScroll,
    category,
    equipment,
    dispatch,
    getFilteredProducts,
    setFilteredItems,
    filteredItems,
  ])

  const handleToggle = useCallback((key: string) => {
    setFilterState((prev) => ({
      ...prev,
      activeCategory: prev.activeCategory === key ? null : key,
    }))
  }, [])

  const handleClick = useCallback(
    (item: string) => {
      const categoryForItem = itemToCategoryMap[item]

      dispatch(setCategory(categoryForItem || ''))
      dispatch(setActiveEquipment(item))

      setFilterState((prev) => ({
        ...prev,
        selectedItem: item,
      }))

      const filtered = getFilteredProducts(item)
      setFilteredItems(filtered)
    },
    [itemToCategoryMap, getFilteredProducts, setFilteredItems, dispatch]
  )

  const handleShowAllProducts = useCallback(() => {
    dispatch(clearFilteredItems())
    dispatch(setCategory(''))
    dispatch(setActiveEquipment(''))
    setFilterState({
      activeCategory: null,
      selectedItem: ALL_PRODUCTS,
    })
    if (onShowAllProducts) {
      onShowAllProducts()
    }
  }, [dispatch, onShowAllProducts])

  return {
    filterState,
    ALL_PRODUCTS,
    handleToggle,
    handleClick,
    handleShowAllProducts,
  }
}