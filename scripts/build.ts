import { logger, run } from './utils'
import minimist from 'minimist'
import { copyFile } from 'fs/promises'
import path from 'node:path'
import { blPackage } from '@panda-ui/internal'
import { blOutput } from '@panda-ui/internal'
import { projRoot } from '@panda-ui/internal'

const args = minimist<{
  d?: boolean
  dev?: boolean
}>(process.argv.slice(2))

const devOnly = args.dev || args.d

const env = devOnly ? 'development' : 'production'

async function main() {
  logger.withBothLn(() => logger.successText('start building lib...'))

  await run('pnpm', ['bootstrap'])
  await run('vite', ['build', '--config', 'vite.config.ts'], {
    env: {
      NODE_ENV: env
    }
  })
  await run('pnpm', ['build:style'])

  copyFile(blPackage, path.join(blOutput, 'package.json')), logger.ln()
  copyFile(path.resolve(projRoot, 'README.md'), path.resolve(blOutput, 'README.md'))
  copyFile(path.resolve(projRoot, 'types.d.ts'), path.resolve(blOutput, 'types.d.ts'))

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('all builds completed successfully'))
  }
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
