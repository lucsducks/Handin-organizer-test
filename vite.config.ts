import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {

  return {
    plugins: [react()],
    base: "/",
 
    /*
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },*/
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@sections": path.resolve(__dirname, "./src/sections"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@lib": path.resolve(__dirname, "./src/lib"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@models": path.resolve(__dirname, "./src/models"),
      },
    },
    build:{
      chunkSizeWarningLimit:1200
    }
  };
});
