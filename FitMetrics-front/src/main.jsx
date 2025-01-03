import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Control from './Control.jsx'

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Control />
  </StrictMode>,
)
