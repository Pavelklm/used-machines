import Search from '@/components/ui/Header/Search/Search'
import Gmail from '@/components/ui/SVG/Gmail'
import { useAppSelector } from '@/scripts/hooks/hooks'
import './style.css'

export const BurgerContent = () => {
  const burgerOverlay = useAppSelector(
    (state) => state.overlay.source === 'burger'
  )

  return (
    <div
      className={`burger-content ${burgerOverlay ? 'burger-content-active' : ''}`}
    >
      <div className='burger-content__container'>
        <Search />
        <div className='header__email'>
          <a
            className='header__email__link link-reset'
            href='mailto:6xYlD@example.com'
          >
            <Gmail className='header__email__icon' />
            '6xYlD@example.com'
          </a>
        </div>
        <div className='header__telephone'>
          <a
            className='header__telephone__link link-reset'
            href='tel:+380501234567'
          >
            +38 (050) 123-45-67
          </a>
        </div>
      </div>
    </div>
  )
}
