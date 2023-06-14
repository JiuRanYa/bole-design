import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import glob from 'fast-glob'
import { blOutput, excludeFiles, pkgRoot } from '@bole-design/internal'
import { generateExternal } from '@bole-design/internal'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const input = excludeFiles(
    await glob('bole-design/*.{js,ts,vue,tsx}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  console.log(input)

  return {
    publicDir: false,
    resolve: {
      alias: [{ find: /^@\//, replacement: resolve(__dirname) }]
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: resolve(pkgRoot, 'bole-design'),
        name: 'bole-design'
      },
      rollupOptions: {
        input,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: resolve(pkgRoot, 'bole-design'),
            dir: resolve(blOutput, 'lib'),
            exports: 'named',
            entryFileNames: '[name].cjs'
          },
          {
            format: 'es',
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: resolve(pkgRoot, 'bole-design'),
            dir: resolve(blOutput, 'es'),
            entryFileNames: '[name].mjs'
          }
        ],
        external: await generateExternal({ full: false }),
        treeshake: false
      },
      commonjsOptions: {
        sourceMap: false
      },
      chunkSizeWarningLimit: 10000
    },
    plugins: [vue(), vueJSX(), DefineOptions()]
  }
})
