import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
      '/api':{ 
        target:'http://10.0.13.94:5000/',
        changeOrigin:true
      }
    } 
  }
})
