import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {  
    outDir: 'dist', // Specify the output directory for the build files  
    sourcemap: true, // Enable sourcemaps for better debugging  
    emptyOutDir: true, // Clear the output directory before building  
  }, 
  server: {
    port: 5173,
    open: "/",
    proxy: {
      "/plan-benefits-chat-api/": {
        target: "https://plan-benefits-chat-api-dev-1.dev.gpd-acq-azure.optum.com",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
