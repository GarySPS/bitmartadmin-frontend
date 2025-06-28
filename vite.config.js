import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Frontend UI
    proxy: {
      '/api': 'http://localhost:5000', // Forward API calls to backend
    },
  },
})