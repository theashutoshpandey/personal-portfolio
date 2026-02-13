import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",   // allows access via IP
    port: 5173,        // your custom port
    strictPort: true,  // fail if port is busy
  },
});