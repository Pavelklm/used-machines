import { Overlay } from '@/components/module/Overlay/Overlay'
import { Footer } from '@/components/ui/Footer/Footer'
import { Header } from '@/components/ui/Header/Header'
import { RootState } from '@/context/store'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const overlay = useSelector((state: RootState) => state.overlay)
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth
  }

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth()
    if (overlay.isOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = ''
    }
  }, [overlay.isOpen])

  return (
    <>
      <Overlay />
      <Toaster position='top-center' reverseOrder={false} />
      <Header />
      <main className='main'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
export { Layout }