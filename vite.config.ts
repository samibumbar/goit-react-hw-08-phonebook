import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy":
        "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;",
    },
  },
  build: {
    rollupOptions: {
      input: "/index.html",
    },
  },
});
