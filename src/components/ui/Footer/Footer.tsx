import Logo from '../SVG/Logo'
import './style.css'

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <div className='footer__content'>
          <div className='footer__logo'>
            <a href='/'>
              <Logo className='logo__icon' />
            </a>
          </div>
          <p className='footer__copyright'>
            © Horns & Hooves, 2025 Усі права захищено
          </p>
          <p className='footer__policy'>Політика конфіденційності</p>
          <p className='footer__agreement'>Користувацька угода</p>
        </div>
      </div>
    </footer>
  )
}
