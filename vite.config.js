import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      // All requests starting with /api are forwarded to the backend,
      // bypassing CORS entirely (browser sees same-origin requests).
      '/api': {
        target: 'https://upwork-nodejs.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
