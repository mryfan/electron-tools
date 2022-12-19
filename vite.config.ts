import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { devPlugin } from "./plugins/devPlugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), devPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
