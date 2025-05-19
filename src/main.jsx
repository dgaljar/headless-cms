import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MyStoreProvider } from './pages/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <MyStoreProvider>
        <App />
  </MyStoreProvider>
)
