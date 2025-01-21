import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ch7dmw9x-8000.uks1.devtunnels.ms',  //port 8000 forwarded address accessed from ports
        changeOrigin: true,
      }
    }
  }
})
