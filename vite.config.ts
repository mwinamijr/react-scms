import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../static/dist", // compiled files go to Django's static folder
    assetsDir: "assets", // assets inside static/dist/assets
    emptyOutDir: true,
  },
  base: "/static/dist/", // 👈 all URLs in index.html will start with /static/dist/
});
