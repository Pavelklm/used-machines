import { Link, useNavigate } from 'react-router-dom'
import Logo from '../SVG/Logo'
import './style.css'

export const Footer = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }
  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <div className='footer__content'>
          <div className='footer__logo'>
            <a className='link-reset logo__link' onClick={handleLogoClick}>
              <Logo className='logo__icon' />
            </a>
          </div>
          <p className='footer__copyright'>
            © Horns & Hooves, 2025 Усі права захищено
          </p>
          <p className='footer__policy'>Політика конфіденційності</p>
          <Link
            to='https://www.behance.net/klmstudio'
            target='_blank'
            className='link-reset Logo_KlM'
          >
            <img src='/icons/Logo_KLM.svg' alt='KLM' />
            Створення сайту
          </Link>
        </div>
      </div>
    </footer>
  )
}
