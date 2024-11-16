import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Change this to 'dist' for CI/CD
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
})
