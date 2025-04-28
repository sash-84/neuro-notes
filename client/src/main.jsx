import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <AppContextProvider>
    <App />
    <Toaster position="top-right"/>
    </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
