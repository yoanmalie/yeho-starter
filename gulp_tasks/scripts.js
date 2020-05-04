/*
  JS tasks
*/

import { src, dest, watch, series } from "gulp"
import pump from "pump"
import del from "del"
import log from "fancy-log"
import gulpif from "gulp-if"
import vinylPaths from "vinyl-paths"
import newer from "gulp-newer"
import webpack from "webpack"
import webpackStream from "webpack-stream"
import webpackConfig from "../webpack.config"

// Global helpers
import {
  paths,
  deleteMap,
  isProduction,
  reload,
  errorHandler,
} from "./_helpers"

// Scripts paths
const js = {
  src: `${paths.source + paths.assets}/js`,
  dest: `${paths.public + paths.assets}/js`,
  entry: "/main",
  extensions: "js",
  name: "app",
}

// Build JS task
async function jsBuild() {
  await pump(
    [
      src(js.src),
      gulpif(isProduction(), vinylPaths(deleteMap(js.dest))),
      newer(js.dest),
      webpackStream(webpackConfig, webpack).on("error", (error) => {
        log.error(error.message)
        this.emit("end")
      }),
      dest(js.dest),
    ],
    errorHandler,
  )
}
jsBuild.description = "Compile .js files"

// Watch JS task
function jsWatch() {
  return watch(`${js.src}/**/*`, series(jsBuild, reload))
}
jsWatch.description = "Watch .js files changes"

// Clean JS task
function jsClean() {
  return del(js.dest)
}
jsClean.description = `Delete the ${js.dest} folder`

export { jsBuild, jsWatch, jsClean }
