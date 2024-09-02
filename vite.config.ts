import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import type { Manifest } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import { blOutput, excludeFiles, pkgRoot } from '@panda-ui/internal'
import DefineOptions from 'unplugin-vue-define-options/vite'
import dts from 'vite-plugin-dts'

const outDir = 'dist/panda-ui/types'

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest

const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {}),
)
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const input = excludeFiles(
    await glob('panda-ui/*.{js,ts,vue,tsx}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  )

  return {
    publicDir: false,
    resolve: {
      alias: [{ find: /^@\//, replacement: resolve(__dirname) }],
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: resolve(pkgRoot, 'panda-ui'),
        name: 'panda-ui',
      },
      rollupOptions: {
        input,
        external,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: resolve(pkgRoot, 'panda-ui'),
            dir: resolve(blOutput, 'lib'),
            exports: 'named',
            entryFileNames: '[name].cjs',
          },
          {
            format: 'es',
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: resolve(pkgRoot, 'panda-ui'),
            dir: resolve(blOutput, 'es'),
            entryFileNames: '[name].mjs',
          },
        ],
        // external: await generateExternal({ full: false }),
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,
    },
    plugins: [
      vue(),
      vueJSX(),
      DefineOptions(),

      dts({
        include: ['packages', 'index.ts', 'types.d.ts'],
        exclude: ['node_modules', 'components/*/tests'],
        outDir,
        compilerOptions: {
          sourceMap: false,
          paths: {
            'panda-ui': ['.'],
            'vue-router': ['node_modules/vue-router'],
          },
          skipDiagnostics: false,
        },
        copyDtsFiles: true,
        pathsToAliases: false,
      }),
    ],
  }
})
