import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { PlatformsContextProvider } from './contexts/PlatformsContext.jsx'
import { ConnectionContextProvider } from './contexts/ConnectionContext.jsx'
import App from './App.jsx'
import './global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <AuthContextProvider>
          <PlatformsContextProvider>
            <ConnectionContextProvider>
                <App />
            </ConnectionContextProvider>
          </PlatformsContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
