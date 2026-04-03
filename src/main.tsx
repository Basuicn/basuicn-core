import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { Toaster } from './components/ui/toast/Toaster'
import { ThemeProvider } from './lib/theme/ThemeProvider'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="violet">
      <App />
      <Toaster position="top-center" expand={true} richColors />
    </ThemeProvider>
  </StrictMode>,
)
