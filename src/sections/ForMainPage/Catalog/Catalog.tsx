import { loadProducts } from '@/api/loadProducts'
import {
  clearFilteredItems,
  setActiveScroll,
  setFilteredItems,
  type FilteredItem,
} from '@/context/slices/filteredItemsSlice'
import { resetScrollToCatalog } from '@/context/slices/scrollSlice'
import { store } from '@/context/store'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import { usePagination } from '@/scripts/hooks/usePagination'
import { useProducts } from '@/scripts/hooks/useProducts'
import { useScrollEndDetection } from '@/scripts/hooks/useScrollEndDetection'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Cards from './Helpers/Cards'
import Filters from './Helpers/Filters'
import Pagination from './Helpers/Pagination'
import CustomSorter from './Helpers/Sorter'
import './style.css'

export const Catalog = () => {
  const catalogRef = useRef<HTMLDivElement>(null)
  const [sortType, setSortType] = useState('high')
  const [animationKey, setAnimationKey] = useState(0)

  const dispatch = useAppDispatch()
  const filteredItems = useAppSelector(
    (state) => state.filteredItems.filteredItems
  )

  const { products, loading } = useAppSelector((state) => state.products)

  const scrollToCatalog = useAppSelector(
    (state) => state.scroll.scrollToCatalog
  )

  const handleScrollEnd = useCallback(() => {
    const state = store.getState()
    const currentCategory = state.filteredItems.category
    const currentEquipment = state.filteredItems.activeEquipment

    if (currentCategory && currentEquipment) {
      dispatch(setActiveScroll(true))
    }
  }, [dispatch])

  const { startTracking, stopTracking } = useScrollEndDetection(
    handleScrollEnd,
    {
      threshold: 2,
      stableFrames: 15,
    }
  )

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(loadProducts() as any)
    }
  }, [dispatch, products.length, loading])

  useEffect(() => {
    if (scrollToCatalog && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      startTracking()
      dispatch(resetScrollToCatalog())
    }
  }, [scrollToCatalog, startTracking, dispatch])

  useEffect(() => {
    return () => {
      stopTracking()
    }
  }, [stopTracking])

  const { productsArray, filterOptionsByGroup, getFilteredProducts } =
    useProducts()

  const itemsToSort = useMemo(() => {
    if (filteredItems.length > 0) {
      return filteredItems
    }
    return productsArray
  }, [filteredItems, productsArray])

  const sortedItems = useMemo(() => {
    if (!itemsToSort || itemsToSort.length === 0) return []

    const sorted = [...itemsToSort].sort(
      (a, b) => Number(a.price) - Number(b.price)
    )
    if (sortType === 'high') {
      sorted.reverse()
    }
    return sorted
  }, [itemsToSort, sortType])

  const { page, pageCount, changePage, currentItems } = usePagination(
    sortedItems,
    6
  )

  const handleFilterChange = useCallback(
    (items: FilteredItem[]) => {
      dispatch(setFilteredItems(items))
      setAnimationKey((prev) => prev + 1)
    },
    [dispatch]
  )

  const handleShowAllProducts = useCallback(() => {
    dispatch(clearFilteredItems())
    setAnimationKey((prev) => prev + 1)
  }, [dispatch])

  return (
    <div ref={catalogRef} className='catalog'>
      <div className='container catalog__container'>
        <div className='catalog__head'>
          <div className='catalog__title'>Каталог</div>
          <div className='catalog__sort'>
            <CustomSorter sortType={sortType} onSortChange={setSortType} />
          </div>
        </div>
        <div className='catalog__content'>
          <div className='catalog__filters'>
            <Filters
              catalogDataByCategory={filterOptionsByGroup}
              getFilteredProducts={getFilteredProducts}
              setFilteredItems={handleFilterChange}
              onShowAllProducts={handleShowAllProducts}
            />
          </div>
          <div className='catalog__items'>
            <div className='catalog__items__list'>
              <Cards
                items={currentItems || []}
                itemsPerPage={6}
                animationKey={animationKey}
              />
            </div>
            <div className='catalog__pagination'>
              <Pagination
                pageCount={pageCount}
                page={page}
                onChange={changePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
