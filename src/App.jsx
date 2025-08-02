// App.jsx
import { Layout } from '@/components/layouts/Layout'
import '@/styles/global.css'
import '@/styles/variables.css'
import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// Lazy load страниц
const Home = lazy(() => import('./pages/Home'))
const ProductPage = lazy(() => import('./pages/ProductPage'))

// Loading компонент
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '18px'
  }}>
    Завантаження...
  </div>
)

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App