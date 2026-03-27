import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#ffffff',
              color: '#000000',
              fontWeight: '600'
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#214984'
              }
            }
          }}
        />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
