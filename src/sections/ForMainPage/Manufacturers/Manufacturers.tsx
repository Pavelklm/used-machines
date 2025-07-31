import { useProducts } from '@/scripts/hooks/useProducts'
import { BrandInfo } from '@/types/products'
import { Key } from 'react'
import './style.css'

export const Manufacturers = () => {
  const { allBrands } = useProducts()

  return (
    <div className='manufacturers'>
      <div className='manufacturers__container container'>
        <h2 className='manufacturers__title'>Виробники устаткування</h2>
        <div className='manufacturers__list list-reset'>
          {allBrands.map((item: BrandInfo, index: Key) => (
            <li className='manufacturers__item' key={index}>
              <img
                src={item.brand__image}
                alt={item.brand_name}
                className='manufacturers__item__img'
                loading='lazy'
                draggable='false'
              />
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}
