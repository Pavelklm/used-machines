import { usePagination } from '@/scripts/hooks/usePagination'
import { allItems } from '@/varibles/cards'
import Cards from './Helpers/Cards'
import Filters from './Helpers/Filters'
import Pagination from './Helpers/Pagination'
import Sorter from './Helpers/Sorter'
import './style.css'

export const Catalog = () => {
  const allItemsArray = Object.values(allItems).flat()

  const { page, pageCount, changePage, fullPageItems } = usePagination(
    allItemsArray,
    12
  )

  return (
    <div className='catalog'>
      <div className='container catalog__container'>
        <div className='catalog__head'>
          <div className='catalog__title'>Каталог</div>
          <div className='catalog__sort'>
            <Sorter />
          </div>
        </div>
        <div className='catalog__content'>
          <div className='catalog__filters'>
            <Filters />
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
