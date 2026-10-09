import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 3001,
    open: "/admin.html",
    proxy: {
      "/api": {
        target: "https://upwork-nodejs.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        admin: "admin.html",
      },
    },
  },
});