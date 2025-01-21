import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'public/assets'),
      '@app': resolve(__dirname, 'src/app'),
      '@pages': resolve(__dirname, 'src/app/pages'),
      '@helpers': resolve(__dirname, 'src/helpers'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@sass': resolve(__dirname, 'src/sass'),
      '@ui': resolve(__dirname, 'src/app/ui'),
      '@css': resolve(__dirname, 'src/css'),
      '@global-layout': resolve(__dirname, 'src/app/ui/layouts')
    },
  },
})
