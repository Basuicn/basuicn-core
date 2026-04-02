import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { Toaster } from './components/ui/toast/Toaster'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
      <Toaster position="top-center" expand={true} richColors />
  </StrictMode>,
)
