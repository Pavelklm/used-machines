import { usePagination } from '@/scripts/hooks/usePagination'
import Cards from './Helpers/Cards'
import Filters from './Helpers/Filters'
import Pagination from './Helpers/Pagination'
import Sorter from './Helpers/Sorter'
import './style.css'

export const Catalog = () => {
  const { page, pageCount, changePage, fullPageItems } = usePagination(
    allItems,
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

const allItems = [
  { name: 'Cutter', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cuttedr', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cuttaer', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cutfter', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cusdsatter', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cutsdaer', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cutfaster', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cuvsadtter', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cuttsdfer', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cuttqwerwer', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cuttlkjher', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'Cuttdtyrter', price: 3200, currency: '$', url: 'cutter.png' },
  { name: 'posrtyg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'psdfog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pvxzczxzog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pxchxog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'poreattrg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pojkgfkjhg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'poertwetg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'posdgsggag', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pasdfasddsfog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'poqwreqwerqw', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'podsafasg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'poxczxvcvbg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'peagtrghytog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'poasdfdsahahg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'poqtewtewqg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pothrmhtdg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'psdfascvxbog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'po/ewqafllg', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'puityrjtgrdfog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'ukmtjnyhbog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pgvfdcsog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'phntrbgfvcdog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'phtbgfvog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'puygtrdfog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pfgscdog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pnhbgvsfdog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pnhbgvsfdaaaog', price: 5000, currency: '$', url: 'cutter.png' },
  { name: 'pog', price: 5000, currency: '$', url: 'cutter.png' },
]
