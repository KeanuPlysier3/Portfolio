import { reactRouter } from "@react-router/dev/vite";
import macros from "unplugin-parcel-macros";
import { defineConfig } from "vite";

export default defineConfig({
  // unplugin-parcel-macros must come before the other plugins (S2 style macros)
  plugins: [macros.vite(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    // S2 ships .css imports; Vite must bundle it so Node doesn't import them directly
    noExternal: ["@react-spectrum/s2"],
  },
  build: {
    target: ["es2022"],
  },
});
