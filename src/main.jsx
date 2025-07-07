import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.js';
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
