import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function resolveSource(...paths: string[]) {
  return path.resolve(__dirname, "src", ...paths);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@api": resolveSource("api"),
      "@components": resolveSource("components"),
      "@context": resolveSource("context"),
      "@utils": resolveSource("utils"),
      "@pages": resolveSource("pages"),
      "@types": resolveSource("types"),
      "@constants": resolveSource("constants"),
      "@features": resolveSource("features"),
      "@auth": resolveSource("features", "authentication"),
      "@computers": resolveSource("features", "computers"),
    },
  },

  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
});
