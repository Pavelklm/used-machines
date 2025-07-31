import { useFilteredProducts } from '@/scripts/hooks/useFilteredProducts'
import { usePagination } from '@/scripts/hooks/usePagination'
import { useState } from 'react'
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
  const [SortedItems, setSortedItems] = useState([])
  const [animationKey, setAnimationKey] = useState(0)

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
            <CustomSorter
              itemsToSort={itemsToSort}
              setSortedItems={setSortedItems}
            />
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
