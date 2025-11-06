import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game, { Board } from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game></Game>
  </StrictMode>,
)
