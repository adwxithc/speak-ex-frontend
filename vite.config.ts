import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const BACKEND_URL =process.env.VITE_BACKEND_URL


export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
      '/api':{ 
        target:BACKEND_URL,
        changeOrigin:true,
        secure:true
      }
    } 
  }
})
