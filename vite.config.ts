import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/support/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/feedback': {
        target: 'https://httpbin.org',
        changeOrigin: true,
        rewrite: () => '/post',
      },
    },
  },
  preview: {
    proxy: {
      '/api/feedback': {
        target: 'https://httpbin.org',
        changeOrigin: true,
        rewrite: () => '/post',
      },
    },
  },
})
