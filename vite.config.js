import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "_app/javascript",
  base: "/",
  build: {
    outDir: "../../_app/build",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        application: path.resolve(__dirname, "_app/javascript/application.js"),
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
});
