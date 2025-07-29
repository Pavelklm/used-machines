'use client'

import { RootState } from '@/context/store'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Overlay } from '../module/overlay/overlay'
import { Footer } from '../ui/Footer/Footer'
import { Header } from '../ui/Header/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const overlay = useSelector((state: RootState) => state.overlay)
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth
  }

  console.log(overlay)

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth()
    if (overlay) {
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = ''
    }
  }, [overlay])

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
