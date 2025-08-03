// App.jsx
import '@/styles/global.css'
import '@/styles/variables.css'
import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const Layout = lazy(() => import('@/components/layouts/Layout'))
const Home = lazy(() => import('./pages/Home'))
const ProductPage = lazy(() => import('./pages/ProductPage'))

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
    </Router>
  )
}

export default App
