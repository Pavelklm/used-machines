import Cards from './Helpers/Cards'
import Filters from './Helpers/Filters'
import Sorter from './Helpers/Sorter'
import './style.css'

export const Catalog = () => {
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
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
            </div>
            <div className='catalog__pagination'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
