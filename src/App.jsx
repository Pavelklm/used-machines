// App.jsx
import { Layout } from '@/components/layouts/Layout'
import '@/styles/global.css'
import '@/styles/variables.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App