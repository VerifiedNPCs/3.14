// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',  // Add this line
    port: 5173,
    allowedHosts: [
      '.ngrok-free.app',  // Allow all ngrok URLs
      '.ngrok.app',       // Alternative ngrok domain
      'localhost'
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setupTests.js', // Make sure this path matches step 1
  }
})
