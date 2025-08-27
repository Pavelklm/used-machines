import Search from '@/components/ui/Header/Search/Search'
import Gmail from '@/components/ui/SVG/Gmail'
import { CONTACTS } from '@/constants/Contacts'
import { setBurgerOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import { useScreenSize } from '@/scripts/hooks/useScreenSize'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BurgerCatalog from './components/BurgerCatalog'
import './style.css'

export const BurgerContent = () => {
  const burgerOverlay = useAppSelector(
    (state) => state.overlay.source === 'burger'
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const { isTablet, isPhone } = useScreenSize()

  useEffect(() => {
    if (isTablet) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      if (target.closest('.burger')) {
        return
      }

      if (contentRef.current && !contentRef.current.contains(target)) {
        dispatch(setBurgerOverlay(false))
      }
    }

    if (burgerOverlay) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [burgerOverlay, dispatch, isTablet])

  const closeBurger = useCallback(() => {
    dispatch(setBurgerOverlay(false))
  }, [dispatch])

  const handleProductSelect = useCallback(
    (productId: string) => {
      dispatch(setBurgerOverlay(false))
      navigate(`/product/${productId}`)
    },
    [dispatch, navigate]
  )

  return (
    <div
      ref={contentRef}
      className={`burger-content ${burgerOverlay ? 'burger-content-active' : ''}`}
    >
      <div className='burger-content__container'>
        <Search
          onOverlayChange={() => {}}
          onSelectProduct={handleProductSelect}
          marginTop='5px'
          paperHeight='100vh'
          overflow='visible'
          className='burger-search'
          width='100%'
        />
        {isTablet && <BurgerCatalog onClose={closeBurger} />}
        <div className='header__email'>
          <a
            className='burger__email__link link-reset'
            href='mailto:6xYlD@example.com'
          >
            <Gmail className='header__email__icon' />
            6xYlD@example.com
          </a>
        </div>
        {!isTablet && (
          <div className='burger__telephone header__telephone '>
            <a
              className='burger__telephone__link link-reset'
              href={`tel:${CONTACTS.phoneNumber}`}
            >
              {CONTACTS.phone}
            </a>
          </div>
        )}
        {isPhone && (
          <div className='burger__telephone header__telephone '>
            <a
              className='burger__telephone__link link-reset'
              href={`tel:${CONTACTS.phoneNumber}`}
            >
              {CONTACTS.phone}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
