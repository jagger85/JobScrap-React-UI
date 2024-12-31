import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  },
  resolve: {
    alias: {
      '@tables': '/src/components/Tables',
      '@modals': '/src/components/Modals',
      '@icons': '/src/components/Icons',
      '@buttons': '/src/components/Buttons',
      '@toasters': '/src/components/Toasters',
      '@layout': '/src/Layout',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@platform-icons': '/src/assets/platform-icons',
    },
  },
})
