import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './context/store'

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
)
