/*
  Fonts tasks
*/

import { src, dest, watch, series } from "gulp"
import pump from "pump"
import del from "del"
import newer from "gulp-newer"

// Global helpers
import { paths, reload, errorHandler } from "./_helpers"

// Fonts paths
const fonts = {
  src: `${paths.source + paths.assets}/fonts`,
  dest: `${paths.public + paths.assets}/fonts`,
  entry: "/**/*",
  extensions: ["woff", "woff2"],
}

// Common fonts entry files
const fontsEntry = `${fonts.src + fonts.entry}.{${fonts.extensions}}`

// Fonts task
async function fontsBuild() {
  await pump(
    [src(fontsEntry), newer(fonts.dest), dest(fonts.dest)],
    errorHandler,
  )
}
fontsBuild.description = "Transfert font files"

// Watch fonts task
function fontsWatch() {
  return watch(fontsEntry, series(fontsBuild, reload))
}
fontsWatch.description = "Watch font files changes"

// Clean fonts task
function fontsClean() {
  return del(fonts.dest)
}
fontsClean.description = `Delete the ${fonts.dest} folder`

export { fontsBuild, fontsWatch, fontsClean }
