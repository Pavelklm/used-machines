// Layout.tsx
import { Toaster } from 'react-hot-toast'
import { Footer } from '../ui/Footer/Footer'
import { Header } from '../ui/Header/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Header />
      <main className='main'>{children}</main>
      <Footer />
    </>
  )
}
