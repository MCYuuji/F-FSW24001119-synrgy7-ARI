import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import './index.css'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='15833639167-fbkj68k3pqprmv2v13oh4p7v7jvl0c7n.apps.googleusercontent.com'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  </React.StrictMode>
)
