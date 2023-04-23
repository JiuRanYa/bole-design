import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig(() => {
  return {
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, "$1") },
        {
          find: /^@bole-ui\/(.+)/,
          replacement: resolve(__dirname, "../common/$1"),
        },
      ],
    },
  };
});
