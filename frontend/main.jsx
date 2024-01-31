import React from 'react'
import ReactDOM from 'react-dom/client'
import TinyMCE from './editor/tiny'
import './index.css'


const tinyEl = document.getElementById('tiny')

if (tinyEl) {
  ReactDOM.createRoot(tinyEl).render(
    <React.StrictMode>
      <TinyMCE {...tinyEl.dataset} />
    </React.StrictMode>,
  )
}
