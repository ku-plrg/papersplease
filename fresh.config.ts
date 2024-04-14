import { defineConfig } from "$fresh/server.ts";
import tailwind from "./tw.ts";

export default defineConfig({
  plugins: [tailwind()],
});
