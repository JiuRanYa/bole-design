// vite.config.ts
import { defineConfig } from "file:///Users/tongsiyuan/projects/bole-design/node_modules/.pnpm/vite@4.2.2_@types+node@18.15.12/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/tongsiyuan/projects/bole-design/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.2.2+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJSX from "file:///Users/tongsiyuan/projects/bole-design/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.2.2+vue@3.2.47/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "node:path";
import glob from "file:///Users/tongsiyuan/projects/bole-design/node_modules/.pnpm/fast-glob@3.2.12/node_modules/fast-glob/out/index.js";
import { blOutput, excludeFiles, pkgRoot } from "file:///Users/tongsiyuan/projects/bole-design/internal/dist/index.cjs";
import { generateExternal } from "file:///Users/tongsiyuan/projects/bole-design/internal/dist/index.cjs";
import DefineOptions from "file:///Users/tongsiyuan/projects/bole-design/node_modules/.pnpm/unplugin-vue-define-options@1.3.7_vue@3.2.47/node_modules/unplugin-vue-define-options/dist/vite.mjs";
var __vite_injected_original_dirname = "/Users/tongsiyuan/projects/bole-design";
var vite_config_default = defineConfig(async () => {
  const input = excludeFiles(
    await glob("bole-design/*.{js,ts,vue,tsx}", {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  );
  console.log(input);
  return {
    publicDir: false,
    resolve: {
      alias: [{ find: /^@\//, replacement: resolve(__vite_injected_original_dirname) }]
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      lib: {
        entry: resolve(pkgRoot, "bole-design"),
        name: "bole-design"
      },
      rollupOptions: {
        input,
        output: [
          {
            format: "cjs",
            preserveModules: true,
            preserveModulesRoot: resolve(pkgRoot, "bole-design"),
            dir: resolve(blOutput, "lib"),
            exports: "named",
            entryFileNames: "[name].cjs"
          },
          {
            format: "es",
            exports: void 0,
            preserveModules: true,
            preserveModulesRoot: resolve(pkgRoot, "bole-design"),
            dir: resolve(blOutput, "es"),
            entryFileNames: "[name].mjs"
          }
        ],
        external: await generateExternal({ full: false }),
        treeshake: false
      },
      commonjsOptions: {
        sourceMap: false
      },
      chunkSizeWarningLimit: 1e4
    },
    plugins: [vue(), vueJSX(), DefineOptions()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdG9uZ3NpeXVhbi9wcm9qZWN0cy9ib2xlLWRlc2lnblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RvbmdzaXl1YW4vcHJvamVjdHMvYm9sZS1kZXNpZ24vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RvbmdzaXl1YW4vcHJvamVjdHMvYm9sZS1kZXNpZ24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSlNYIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZmFzdC1nbG9iJ1xuaW1wb3J0IHsgYmxPdXRwdXQsIGV4Y2x1ZGVGaWxlcywgcGtnUm9vdCB9IGZyb20gJ0Bib2xlLWRlc2lnbi9pbnRlcm5hbCdcbmltcG9ydCB7IGdlbmVyYXRlRXh0ZXJuYWwgfSBmcm9tICdAYm9sZS1kZXNpZ24vaW50ZXJuYWwnXG5pbXBvcnQgRGVmaW5lT3B0aW9ucyBmcm9tICd1bnBsdWdpbi12dWUtZGVmaW5lLW9wdGlvbnMvdml0ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gZXhjbHVkZUZpbGVzKFxuICAgIGF3YWl0IGdsb2IoJ2JvbGUtZGVzaWduLyoue2pzLHRzLHZ1ZSx0c3h9Jywge1xuICAgICAgY3dkOiBwa2dSb290LFxuICAgICAgYWJzb2x1dGU6IHRydWUsXG4gICAgICBvbmx5RmlsZXM6IHRydWVcbiAgICB9KVxuICApXG4gIGNvbnNvbGUubG9nKGlucHV0KVxuXG4gIHJldHVybiB7XG4gICAgcHVibGljRGlyOiBmYWxzZSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW3sgZmluZDogL15AXFwvLywgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lKSB9XVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiByZXNvbHZlKHBrZ1Jvb3QsICdib2xlLWRlc2lnbicpLFxuICAgICAgICBuYW1lOiAnYm9sZS1kZXNpZ24nXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dCxcbiAgICAgICAgb3V0cHV0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZm9ybWF0OiAnY2pzJyxcbiAgICAgICAgICAgIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcbiAgICAgICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6IHJlc29sdmUocGtnUm9vdCwgJ2JvbGUtZGVzaWduJyksXG4gICAgICAgICAgICBkaXI6IHJlc29sdmUoYmxPdXRwdXQsICdsaWInKSxcbiAgICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXG4gICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5janMnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmb3JtYXQ6ICdlcycsXG4gICAgICAgICAgICBleHBvcnRzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXG4gICAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXNSb290OiByZXNvbHZlKHBrZ1Jvb3QsICdib2xlLWRlc2lnbicpLFxuICAgICAgICAgICAgZGlyOiByZXNvbHZlKGJsT3V0cHV0LCAnZXMnKSxcbiAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLm1qcydcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGV4dGVybmFsOiBhd2FpdCBnZW5lcmF0ZUV4dGVybmFsKHsgZnVsbDogZmFsc2UgfSksXG4gICAgICAgIHRyZWVzaGFrZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgICAgc291cmNlTWFwOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMDBcbiAgICB9LFxuICAgIHBsdWdpbnM6IFt2dWUoKSwgdnVlSlNYKCksIERlZmluZU9wdGlvbnMoKV1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1MsU0FBUyxvQkFBb0I7QUFDalUsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsVUFBVSxjQUFjLGVBQWU7QUFDaEQsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxtQkFBbUI7QUFQMUIsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTyxzQkFBUSxhQUFhLFlBQVk7QUFDdEMsUUFBTSxRQUFRO0FBQUEsSUFDWixNQUFNLEtBQUssaUNBQWlDO0FBQUEsTUFDMUMsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0g7QUFDQSxVQUFRLElBQUksS0FBSztBQUVqQixTQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsTUFDUCxPQUFPLENBQUMsRUFBRSxNQUFNLFFBQVEsYUFBYSxRQUFRLGdDQUFTLEVBQUUsQ0FBQztBQUFBLElBQzNEO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsUUFDSCxPQUFPLFFBQVEsU0FBUyxhQUFhO0FBQUEsUUFDckMsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTjtBQUFBLFlBQ0UsUUFBUTtBQUFBLFlBQ1IsaUJBQWlCO0FBQUEsWUFDakIscUJBQXFCLFFBQVEsU0FBUyxhQUFhO0FBQUEsWUFDbkQsS0FBSyxRQUFRLFVBQVUsS0FBSztBQUFBLFlBQzVCLFNBQVM7QUFBQSxZQUNULGdCQUFnQjtBQUFBLFVBQ2xCO0FBQUEsVUFDQTtBQUFBLFlBQ0UsUUFBUTtBQUFBLFlBQ1IsU0FBUztBQUFBLFlBQ1QsaUJBQWlCO0FBQUEsWUFDakIscUJBQXFCLFFBQVEsU0FBUyxhQUFhO0FBQUEsWUFDbkQsS0FBSyxRQUFRLFVBQVUsSUFBSTtBQUFBLFlBQzNCLGdCQUFnQjtBQUFBLFVBQ2xCO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBVSxNQUFNLGlCQUFpQixFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQUEsUUFDaEQsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLFFBQ2YsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUEsSUFDQSxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxjQUFjLENBQUM7QUFBQSxFQUM1QztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
