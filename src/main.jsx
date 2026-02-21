import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoadingProvider } from './context/LoadingContext'
import { HomePage } from './page/HomePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <HomePage />
    </LoadingProvider>
  </StrictMode>,
)
