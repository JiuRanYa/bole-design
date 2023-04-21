import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import glob from "fast-glob";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const input = await glob("packages/components/**/*.{ts,vue}", {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true,
  });

  input.push(resolve(__dirname, "index.ts"));

  return {
    plugins: [vue()],
    build: {
      outDir: "es",
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, "index.ts"),
        name: "BoleUI",
      },
      rollupOptions: {
        input,
        output: [
          {
            format: "cjs",
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: "lib",
            entryFileNames: "[name].cjs",
          },
          {
            format: "es",
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: "es",
            entryFileNames: "[name].mjs",
          },
        ],
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,
    },
  };
});
