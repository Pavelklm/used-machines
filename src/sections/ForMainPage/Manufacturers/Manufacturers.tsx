import {
  setActiveEquipment,
  setCategory,
} from '@/context/slices/filteredItemsSlice'
import { triggerScrollToCatalog } from '@/context/slices/scrollSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { useProducts } from '@/scripts/hooks/useProducts'
import { BrandInfo } from '@/types/products'
import { Key } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.css'

export const Manufacturers = () => {
  const { allBrands, getCategoryFromEquipment } = useProducts()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const duplicatedBrands = [...allBrands, ...allBrands]

  const handleBrandClick = (brandName: string) => {
    const category = getCategoryFromEquipment(brandName)
    dispatch(setCategory(category || ''))
    dispatch(setActiveEquipment(brandName))

    const isOnHomePage = location.pathname === '/'

    if (isOnHomePage) {
      dispatch(triggerScrollToCatalog())
    } else {
      navigate('/', {
        state: {
          shouldScrollToCatalog: true,
          filteredBy: brandName,
        },
      })
    }
  }

  return (
    <div className='manufacturers'>
      <div className='manufacturers__container container'>
        <h2 className='manufacturers__title'>Виробники устаткування</h2>

        <div className='manufacturers__slider'>
          <div className='manufacturers__track'>
            {duplicatedBrands.map((item: BrandInfo, index: Key) => (
              <div
                className='manufacturers__slide'
                key={`${item.brand_name}-${index}`}
                onClick={() => handleBrandClick(item.brand_name)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleBrandClick(item.brand_name)
                  }
                }}
              >
                <img
                  src={item.brand__image}
                  alt={`Логотип бренду ${item.brand_name} - виробник м'ясного обладнання`}
                  className='manufacturers__slide__img'
                  loading='lazy'
                  draggable='false'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
