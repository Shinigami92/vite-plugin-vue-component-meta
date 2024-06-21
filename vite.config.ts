import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueMeta from "./src/index";

export default defineConfig({
  plugins: [vueMeta(), vue()],
});
