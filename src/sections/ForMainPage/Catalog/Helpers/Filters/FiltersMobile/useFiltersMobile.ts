import {
  clearFilteredItems,
  setActiveEquipment,
  setActiveScroll,
  setCategory,
  type FilteredItem,
} from '@/context/slices/filteredItemsSlice'
import { setCatalogOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

const ALL_PRODUCTS = 'Уся продукція' as const

interface FilterState {
  activeCategory: string | null
  selectedItem: string
}

interface UseFiltersMobileProps {
  catalogDataByCategory: Record<string, string[]>
  getFilteredProducts: (name: string) => FilteredItem[]
  setFilteredItems: (items: FilteredItem[]) => void
  onShowAllProducts?: () => void
}

export function useFiltersMobile({
  catalogDataByCategory,
  getFilteredProducts,
  setFilteredItems,
  onShowAllProducts,
}: UseFiltersMobileProps) {
  const [menuOpen, setMenuOpen] = useState(false)
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
  const equipment = useAppSelector(
    (state) => state.filteredItems.activeEquipment
  )
  const filteredItems = useAppSelector(
    (state) => state.filteredItems.filteredItems
  )
  const activeScroll = useAppSelector(
    (state) => state.filteredItems.activeScroll
  )

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

  // Обработка клика по категории (аналог handleToggle из Filters)
  const handleItemClick = useCallback((key: string) => {
    setFilterState((prev) => ({
      ...prev,
      activeCategory: prev.activeCategory === key ? null : key,
    }))
  }, [])

  // Обработка клика по оборудованию
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

  // Обработка клика вне области
  const handleClickAway = useCallback(() => {
    setMenuOpen(false)
    setFilterState((prev) => ({ ...prev, activeCategory: null }))
    dispatch(setCatalogOverlay(false))
  }, [dispatch])

  const handleMainClick = useCallback(() => {
    const newMenuOpen = !menuOpen
    setMenuOpen(newMenuOpen)

    if (!newMenuOpen) {
      setFilterState((prev) => ({ ...prev, activeCategory: null }))
    }
  }, [menuOpen])

  // Обработка показа всех продуктов
  const handleShowAllProducts = useCallback(() => {
    dispatch(clearFilteredItems())
    dispatch(setCategory(''))
    dispatch(setActiveEquipment(''))
    setFilterState({
      activeCategory: null,
      selectedItem: ALL_PRODUCTS,
    })

    // Закрываем popup после выбора
    setMenuOpen(false)
    dispatch(setCatalogOverlay(false))

    if (onShowAllProducts) {
      onShowAllProducts()
    }
  }, [dispatch, onShowAllProducts])

  // Обновляем handleClick, чтобы закрывать popup
  const handleClickUpdated = useCallback(
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

      // Закрываем popup после выбора
      setMenuOpen(false)
      dispatch(setCatalogOverlay(false))
    },
    [itemToCategoryMap, getFilteredProducts, setFilteredItems, dispatch]
  )

  return {
    menuOpen,
    filterState,
    ALL_PRODUCTS,
    handleClickAway,
    handleMainClick,
    handleItemClick,
    handleClick: handleClickUpdated,
    handleShowAllProducts,
  }
}
