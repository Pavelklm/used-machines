'use client'

import CatalogPopup from '../CatalogPopup/CatalogPopup'
import Search from '../Search/Search'
import Gmail from '../SVG/Gmail'
import Logo from '../SVG/Logo'
import './style.css'

export const Header = () => {
  return (
    <header className='header'>
      <div className='container header__container'>
        <div className='header__logo'>
          <a href='/'>
            <Logo className='header__logo__icon' />
          </a>
        </div>
        <div className='header__catalog'>
          <CatalogPopup />
        </div>
        <div className='header__search'>
          <Search />
        </div>
        <div className='header__email'>
          <a
            className='header__email__link link-reset'
            href='mailto:6xYlD@example.com'
          >
            <Gmail className='header__email__icon' />
            6xYlD@example.com
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
    </header>
  )
}
