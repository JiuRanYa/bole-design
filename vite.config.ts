import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import glob from 'fast-glob'
import { blOutput, excludeFiles, pkgRoot } from './common/path/index'
import { generateExternal } from './scripts/utils'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  return {
    plugins: [vue()],
    resolve: {
      alias: [
        { find: /^@\//, replacement: resolve(__dirname) },
        {
          find: /^@bole-design\/(.+)/,
          replacement: resolve(pkgRoot, '$1'),
        },
      ],
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: resolve(pkgRoot, 'bole-design'),
        name: 'bole-design',
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
            entryFileNames: '[name].cjs',
          },
          {
            format: 'es',
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: resolve(pkgRoot, 'bole-design'),
            dir: resolve(blOutput, 'es'),
            entryFileNames: '[name].mjs',
          },
        ],
        external: await generateExternal(),
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,
    },
  }
})
