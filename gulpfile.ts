import fs from 'fs-extra'
import path from 'path'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import { resolve } from 'node:path'
import cleanCss from 'gulp-clean-css'
import autoPrefixer from 'gulp-autoprefixer'
import { series, parallel, src, dest } from 'gulp'

const { existsSync, mkdirSync, emptyDir } = fs

// generate a function using quick sort

const buildOutput = resolve(__dirname, 'dist')
const distCssBundle = path.resolve(buildOutput, 'bole-design/css')
const cssDir = resolve(buildOutput, 'bole-design/css')

function buildStyle() {
  ensureEmptyDir(cssDir)

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

// TODO: fix not empty
function copySassSource() {
  ensureEmptyDir(resolve(cssDir, 'src'))

  return src(path.resolve(__dirname, 'packages/styles/**')).pipe(
    dest(path.resolve(distCssBundle, 'src'))
  )
}

export default parallel(series(buildStyle), series(copySassSource))
