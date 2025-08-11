// App.jsx
import '@/styles/global.css'
import '@/styles/variables.css'
import '@/styles/animations.css'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const Layout = lazy(() => import('@/components/layouts/Layout'))
const Home = lazy(() => import('./pages/Home'))
const ProductPage = lazy(() => import('./pages/ProductPage'))

// Конфигурация тостера - выносим отдельно для читаемости
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
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    gap: '20px'
  }}>
    <div className="dots-spinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div style={{ color: '#666', fontSize: '14px' }}>Завантаження...</div>
  </div>
)

const LayoutLoader = () => (
  <div style={{
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
    gap: '20px'
  }}>
    <div className="dots-spinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div style={{ color: '#2b4c7e', fontSize: '16px' }}>Завантаження...</div>
  </div>
)

function App() {
  return (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Suspense>
      
      {/* Toaster должен быть ЗДЕСЬ - вне Layout но внутри Router */}
      {/* Так он будет доступен на всех страницах но не будет дублироваться */}
      <Toaster {...TOAST_CONFIG} />
    </Router>
  )
}

export default App