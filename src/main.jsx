import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LocationProvider } from './context/LocationContext';
import { NightModeProvider } from './context/NightModeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NightModeProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </NightModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
