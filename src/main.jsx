import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { queryClient } from './api/config/queryClient'
import App from './App.jsx'
import { store } from './context/store'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 481,
      md: 769,
      lg: 1025,
      xl: 1256,
    },
  },
})

const loader = document.querySelector('.app-loader')
if (loader) loader.style.display = 'none'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>
)
