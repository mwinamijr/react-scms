import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/static/dist/", // 👈 This is the key line
  build: {
    outDir: "../static/dist", // make sure this matches Django's static folder
    emptyOutDir: true,
  },
});
