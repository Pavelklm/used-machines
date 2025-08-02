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
    justifyContent: 'center', 
    alignItems: 'center',
    height: '50vh',
    fontFamily: 'system-ui',
    color: '#666'
  }}>
    <div>⚡ Завантаження...</div>
  </div>
)

const LayoutLoader = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }}>
    <div style={{ fontSize: '24px' }}>🚀</div>
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