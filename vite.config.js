import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub project site: manzileila.github.io/Graduation-Invitation/
  base: '/Graduation-Invitation/',
  plugins: [react()],
})
