import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Tambahkan baris ini

// Konfigurasi untuk mendukung Tailwind CSS v4 dan React 19
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Aktifkan plugin tailwind di sini
  ],
})