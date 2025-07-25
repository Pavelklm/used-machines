// Catalog.tsx
import { useFilteredProducts } from '@/scripts/hooks/useFilteredProducts'
import { usePagination } from '@/scripts/hooks/usePagination'
import { useState } from 'react'
import Cards from './Helpers/Cards'
import Filters from './Helpers/Filters'
import Pagination from './Helpers/Pagination'
import Sorter from './Helpers/Sorter'
import './style.css'

export const Catalog = ({
  catalogRef,
}: {
  catalogRef: React.RefObject<HTMLDivElement | null>
}) => {
  const [SortedItems, setSortedItems] = useState([])
  const {
    itemsToSort,
    filterOptionsByGroup,
    getFilteredProducts,
    setFilteredItems,
  } = useFilteredProducts()

  const { page, pageCount, changePage, fullPageItems } = usePagination(
    SortedItems,
    6
  )

  return (
    <div ref={catalogRef} className='catalog'>
      <div className='container catalog__container'>
        <div className='catalog__head'>
          <div className='catalog__title'>Каталог</div>
          <div className='catalog__sort'>
            <Sorter itemsToSort={itemsToSort} setSortedItems={setSortedItems} />
          </div>
        </div>
        <div className='catalog__content'>
          <div className='catalog__filters'>
            <Filters
              catalogDataByCategory={filterOptionsByGroup}
              getFilteredProducts={getFilteredProducts}
              setFilteredItems={setFilteredItems}
            />
          </div>
          <div className='catalog__items'>
            <div className='catalog__items__list'>
              <Cards items={fullPageItems} />
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
