import {
  clearFilteredItems,
  setFilteredItems,
} from '@/context/slices/filteredItemsSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { useProducts } from './useProducts'

export const useFilteredProducts = () => {
  const { productsArray, getFilteredProducts, filterOptionsByGroup } =
    useProducts()

  const dispatch = useAppDispatch()

  const filteredItems = useAppSelector(
    (state) => state.filteredItems.filteredItems
  )

  useEffect(() => {
    if (filteredItems.length === 0) {
      dispatch(setFilteredItems(productsArray))
    }
  }, [productsArray, dispatch, filteredItems.length])

  const itemsToSort = filteredItems.length === 0 ? productsArray : filteredItems

  return {
    itemsToSort,
    filterOptionsByGroup,
    getFilteredProducts,
    setFilteredItems: (items: any) => dispatch(setFilteredItems(items)),
    clearFilteredItems: () => dispatch(clearFilteredItems()),
  }
}
