import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
  server: {
    proxy: {
      '/cloudinary': {
        target: 'https://api.cloudinary.com/v1_1/dcb8hrswl/upload',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cloudinary/, ''),
      },
    },
  },
})
