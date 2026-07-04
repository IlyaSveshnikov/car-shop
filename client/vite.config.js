import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Адрес NestJS-сервера из папки server (PORT=4000 в server/.env)
const API_TARGET = "http://localhost:4000";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    // Проксируем запросы к GraphQL API и статике (фото авто) на сервер,
    // чтобы относительные пути из ответов сервера работали без CORS.
    proxy: {
      "/api": API_TARGET,
      "/static": API_TARGET,
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: false,
  },
});
