import { useFilteredProducts } from '@/scripts/hooks/useFilteredProducts'
import { usePagination } from '@/scripts/hooks/usePagination'
import React, { useMemo, useState } from 'react'
import Cards from './Helpers/Cards'
import Filters from './Helpers/Filters'
import Pagination from './Helpers/Pagination'
import CustomSorter from './Helpers/Sorter'
import './style.css'

export const Catalog = ({
  catalogRef,
}: {
  catalogRef: React.RefObject<HTMLDivElement | null>
}) => {
  const [sortType, setSortType] = useState('high')
  const [animationKey, setAnimationKey] = useState(0)

  const {
    itemsToSort,
    filterOptionsByGroup,
    getFilteredProducts,
    setFilteredItems,
  } = useFilteredProducts()

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

  const { page, pageCount, changePage, fullPageItems } = usePagination(
    sortedItems,
    6
  )

  const handleFilterChange = (items: any[]) => {
    setFilteredItems(items)
    setAnimationKey((prev) => prev + 1)
  }

  const handleShowAllProducts = () => {
    setAnimationKey((prev) => prev + 1)
  }

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
              <Cards items={fullPageItems || []} animationKey={animationKey} />
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
