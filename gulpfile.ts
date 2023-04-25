import { series, parallel, src, dest } from 'gulp'
import fs from 'fs-extra'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import { resolve } from 'node:path'
import cleanCss from 'gulp-clean-css'
import autoPrefixer from 'gulp-autoprefixer'

const { existsSync, mkdirSync, emptyDir } = fs

const buildOutput = resolve(__dirname, 'dist')
const cssDir = resolve(buildOutput, 'bole-design/css')

function buildStyle() {
  ensureEmptyDir(cssDir)
  // place code for your default task here
  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'packages/styles/**/*.scss'))
    .pipe(sass.sync())
    .pipe(autoPrefixer())
    .pipe(cleanCss())
    .pipe(dest(cssDir))
}

function ensureEmptyDir(dir: string) {
  existsSync(dir) ? emptyDir(dir) : mkdirSync(dir)
}

export default parallel(series(buildStyle))
