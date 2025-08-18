'use client'

import { useScreenSize } from '@/scripts/hooks/useScreenSize'
import { useNavigate } from 'react-router-dom'
import Gmail from '../SVG/Gmail'
import Logo from '../SVG/Logo'
import CatalogPopup from './CatalogPopup/CatalogPopup'
import Search from './Search/Search'
import './style.css'

export const Header = () => {
  const navigate = useNavigate()
  const { isMobile, isTablet, width } = useScreenSize()

  const handleLogoClick = () => {
    navigate('/')
  }
  return (
    <header className='header'>
      <div className='container header__container'>
        <div className='header__logo'>
          <a className='link-reset logo__link' onClick={handleLogoClick}>
            <Logo className='logo__icon' />
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
