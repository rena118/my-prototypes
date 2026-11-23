import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 4178,
    host: "0.0.0.0",
    strictPort: true,
    fs: { allow: ["../.."] },
  },
  preview: { port: 4178, host: "0.0.0.0", strictPort: true },
});

