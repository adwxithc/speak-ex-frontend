import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import store from './redux/store.ts'
import { Toaster} from 'react-hot-toast'
import './utils/i18n.ts'


import App from './App.tsx'
import './index.css'
import {SocketProvider} from './context/SocketProvider.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <React.Suspense fallback="loading...">
        <SocketProvider>
              <App />
        </SocketProvider>
    </React.Suspense>
    <Toaster position="bottom-right" />
    </StyledEngineProvider>
  </React.StrictMode>
  </Provider>
)
