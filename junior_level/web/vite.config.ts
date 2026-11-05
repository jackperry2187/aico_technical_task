import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/list': 'http://localhost:5050',
      '/device': 'http://localhost:5050',
      '/register': 'http://localhost:5050'
    }
  }
})
