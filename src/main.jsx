import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { queryClient } from './api/config/queryClient'

import App from './App.jsx'
import { store } from './context/store'

const loader = document.querySelector('.app-loader')
if (loader) loader.style.display = 'none'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
)
