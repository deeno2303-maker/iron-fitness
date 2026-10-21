import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? "/iron-fitness/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    // Local dev: /api calls go to the Express server
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
