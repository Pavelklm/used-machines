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

  const itemsToSort = useMemo(() => {
    if (filteredItems.length > 0) {
      return filteredItems
    }

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
