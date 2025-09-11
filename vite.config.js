import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will forward any request starting with /api to your backend server
      '/api': {
        target: 'http://localhost:5001', // Your admin backend's address
        changeOrigin: true,
      },
    },
  },
})