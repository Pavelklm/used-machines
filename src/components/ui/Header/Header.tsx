'use client'

import Burger from '@/components/module/Burger/Burger'
import { BurgerContent } from '@/components/module/Burger/BurgerContent/BurgerContent'
import { CONTACTS } from '@/constants/Contacts'
import { setSearchOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { useScreenSize } from '@/scripts/hooks/useScreenSize'
import { useNavigate } from 'react-router-dom'
import Gmail from '../SVG/Gmail'
import Logo from '../SVG/Logo'
import CatalogPopup from './CatalogPopup/CatalogPopup'
import Search from './Search/Search'
import './style.css'

export const Header = () => {
  const navigate = useNavigate()
  const { isTablet, isLaptop, isDesktop } = useScreenSize()
  const dispatch = useAppDispatch()
  const handleSearchOverlay = (show: boolean) => {
    dispatch(setSearchOverlay(show))
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <div>
      <header className='header'>
        <div className='container header__container'>
          <div className='header__logo'>
            <a className='link-reset logo__link' onClick={handleLogoClick}>
              <Logo className='logo__icon' />
            </a>
          </div>
          {!isTablet && (
            <div className='header__catalog'>
              <CatalogPopup />
            </div>
          )}
          {!isLaptop && (
            <Search
              onOverlayChange={handleSearchOverlay}
              marginTop={'33px'}
              width={'300px'}
            />
          )}
          {!isLaptop && (
            <div className='header__email'>
              <a
                className='header__email__link link-reset'
                href={`mailto:${CONTACTS.email}`}
              >
                <Gmail className='header__email__icon' />
                {isDesktop ? CONTACTS.email : ''}
              </a>
            </div>
          )}
          <div className='header__telephone'>
            <a
              className='header__telephone__link link-reset'
              href={`tel:${CONTACTS.phoneNumber}`}
            >
              {CONTACTS.phone}
            </a>
          </div>
          {isLaptop && <div className='burger-box-placeholder'></div>}
        </div>
      </header>
      <BurgerContent />
      <Burger />
    </div>
  )
}
