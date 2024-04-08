import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import store from './redux/store.ts'
import { Toaster} from 'react-hot-toast'


import App from './App.tsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <App />
    <Toaster position="bottom-right" />
    </StyledEngineProvider>
  </React.StrictMode>
  </Provider>
)
