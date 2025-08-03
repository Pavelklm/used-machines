import {
  clearFilteredItems,
  setFilteredItems,
} from '@/context/slices/filteredItemsSlice'
import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { useProducts } from './useProducts'

export const useFilteredProducts = () => {
  const { productsArray, getFilteredProducts, filterOptionsByGroup } =
    useProducts()

  const dispatch = useAppDispatch()

  const filteredItems = useAppSelector(
    (state) => state.filteredItems.filteredItems
  )

  // Простое мемоизированное вычисление - никаких side effects!
  const itemsToSort = useMemo(() => {
    // Если есть отфильтрованные элементы - используем их
    if (filteredItems.length > 0) {
      return filteredItems
    }
    
    // Иначе используем все продукты
    return productsArray
  }, [filteredItems, productsArray])

  return {
    itemsToSort,
    filterOptionsByGroup,
    getFilteredProducts,
    setFilteredItems: (items: any) => dispatch(setFilteredItems(items)),
    clearFilteredItems: () => dispatch(clearFilteredItems()),
  }
}
