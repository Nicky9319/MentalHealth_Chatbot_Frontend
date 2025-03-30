import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy requests to your ngrok tunnel
      "/api":
        "https://5e59-2409-4050-2d17-7982-9576-fbc4-25aa-6721.ngrok-free.app",
    },
    cors: {
      // Allow access from the ngrok tunnel origin
      origin:
        "https://5e59-2409-4050-2d17-7982-9576-fbc4-25aa-6721.ngrok-free.app",
    },
    hmr: {
      clientPort: 5173, // If using HTTPS ngrok tunnel, set to 443
    },
  },
});
