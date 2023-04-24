import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import glob from 'fast-glob'
import { blOutput, excludeFiles, pkgRoot } from './common/path/index'

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
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') },
        {
          find: /^@bole-design\/(.+)/,
          replacement: resolve(__dirname, 'packages/$1'),
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
            preserveModulesRoot: pkgRoot,
            dir: resolve(blOutput, 'lib'),
            entryFileNames: '[name].cjs',
          },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: pkgRoot,
            dir: resolve(blOutput, 'es'),
            entryFileNames: '[name].mjs',
          },
        ],
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,
    },
  }
})
