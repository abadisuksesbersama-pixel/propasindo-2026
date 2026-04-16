import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi standar untuk Vite 6+ dan React 19
export default defineConfig({
  plugins: [react()],
})