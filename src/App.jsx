// App.jsx
import ScrollToTop from '@/scripts/utils/ScrollToTop.tsx'
import '@/styles/animations.css'
import '@/styles/global.css'
import '@/styles/variables.css'
import { lazy, Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const Layout = lazy(() => import('@/components/layouts/Layout'))
const Home = lazy(() => import('./pages/Home'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const PolicyPage = lazy(() => import('./pages/PolicyPage'))

const TOAST_CONFIG = {
  position: 'top-right',
  reverseOrder: false,
  gutter: 8,
  toastOptions: {
    duration: 4000,
    style: {
      background: '#fff',
      color: '#363636',
      fontSize: '14px',
      maxWidth: '500px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    success: {
      duration: 5000,
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
    },
    error: {
      duration: 6000,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
    loading: {
      iconTheme: {
        primary: '#3b82f6',
        secondary: '#fff',
      },
    },
  },
}

const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      gap: '20px',
    }}
  >
    <div className='dots-spinner'>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div style={{ color: '#666', fontSize: '14px' }}>Завантаження...</div>
  </div>
)

const LayoutLoader = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      gap: '20px',
    }}
  >
    <div className='dots-spinner'>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div style={{ color: '#2b4c7e', fontSize: '16px' }}>Завантаження...</div>
  </div>
)

function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LayoutLoader />}>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/policy' element={<PolicyPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Suspense>

      <Toaster {...TOAST_CONFIG} />
    </Router>
  )
}

export default App
