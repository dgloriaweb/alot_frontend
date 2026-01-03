import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/alot_frontend/',
  server: {
    port: 3000,
    open: true
  }
})

