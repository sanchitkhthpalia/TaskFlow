import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode is known to break drag-and-drop tracking in react-beautiful-dnd/hello-pangea-dnd
createRoot(document.getElementById('root')).render(
  <App />
)
