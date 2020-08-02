/*
  Sass tasks
*/

import { src, dest, watch, series } from "gulp"
import pump from "pump"
import del from "del"
import gulpif from "gulp-if"
import vinylPaths from "vinyl-paths"
import newer from "gulp-newer"
import sass from "gulp-sass"
import postcss from "gulp-postcss"
import sourcemaps from "gulp-sourcemaps"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import mergeMq from "postcss-combine-media-query"
import Fiber from "fibers"
import stylelint from "gulp-stylelint"

// Global paths and helpers
import {
  paths,
  deleteMap,
  isDevelopment,
  isProduction,
  reload,
  errorHandler,
} from "./_helpers"

// Choose the Sass compiler
// sass (for dart-sass) or node-sass (used by default)
sass.compiler = require("sass")

// Styles paths
const css = {
  src: `${paths.source + paths.assets}/css`,
  dest: `${paths.public + paths.assets}/css`,
  entry: "/**/*",
  extensions: "scss",
}

// Common CSS entry files
const cssEntry = `${css.src + css.entry}.${css.extensions}`

// Build Sass task
function sassBuild() {
  // PostCSS plugins options
  const removeComments = isProduction()
  const minification = isProduction()
  const postcssPlugins = [
    autoprefixer(),
    cssnano({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: removeComments,
          },
          normalizeWhitespace: minification,
          minifyFontValues: {
            removeQuotes: false,
          },
          colormin: false,
        },
      ],
    }),
    mergeMq(),
  ]

  // Task core
  return pump(
    [
      src(cssEntry),
      gulpif(isProduction(), vinylPaths(deleteMap(css.dest))),
      gulpif(isDevelopment(), sourcemaps.init()),
      newer(css.dest),
      sass({
        fiber: Fiber,
        includePaths: ["node_modules"],
      }).on("error", sass.logError),
      postcss(postcssPlugins),
      gulpif(isDevelopment(), sourcemaps.write(".")),
      dest(css.dest),
    ],
    errorHandler,
  )
}
sassBuild.description = "Compile .scss files"

// Lint Sass task
function sassLint() {
  return pump([
    src(cssEntry),
    stylelint({
      failAfterError: false,
      reporters: [{ formatter: "string", console: true }],
      fix: true,
    }),
  ])
}
sassLint.description = "Lint .scss files"

// Watch Sass task
function sassWatch() {
  return watch(cssEntry, series(sassBuild, reload))
}
sassWatch.description = "Watch .sass files changes"

// Clean CSS task
function cssClean() {
  return del(css.dest)
}
cssClean.description = `Delete the ${css.dest} folder`

export { sassBuild, sassLint, sassWatch, cssClean }
