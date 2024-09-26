import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

const div = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(div).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
