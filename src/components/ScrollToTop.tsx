import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // useLayoutEffect срабатывает раньше чем useEffect
    // Это должно перехватить scroll restoration до рендера
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
