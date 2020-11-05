import { parallel, series } from "gulp"

// Import tasks files
import { sassBuild, sassLint, sassWatch, cssClean } from "./gulp_tasks/styles"
import { jsBuild, jsWatch, jsClean } from "./gulp_tasks/scripts"
import { imgBuild, imgWatch, imgClean } from "./gulp_tasks/images"
import { fontsBuild, fontsWatch, fontsClean } from "./gulp_tasks/fonts"
import drushCr from "./gulp_tasks/shell"
import syncInit from "./gulp_tasks/sync"

// Styles tasks
exports["styles:build"] = sassBuild
exports["styles:lint"] = sassLint
exports["styles:watch"] = sassWatch
exports["styles:clean"] = cssClean
exports.styles = series(cssClean, sassBuild, sassWatch)

// Scripts tasks
exports["scripts:build"] = jsBuild
exports["scripts:watch"] = jsWatch
exports["scripts:clean"] = jsClean
exports.scripts = series(jsClean, jsBuild, jsWatch)

// Images tasks
exports["images:build"] = imgBuild
exports["images:watch"] = imgWatch
exports["images:clean"] = imgClean
exports.images = series(imgClean, imgBuild, imgWatch)

// Fonts tasks
exports["fonts:build"] = fontsBuild
exports["fonts:watch"] = fontsWatch
exports["fonts:clean"] = fontsClean
exports.fonts = series(fontsClean, fontsBuild, fontsWatch)

// Shell tasks
exports["shell:drushcr"] = drushCr
exports.shell = series(drushCr)

// Sync tasks
exports["sync:init"] = syncInit

// Global tasks
exports.clean = parallel(
  exports["styles:clean"],
  exports["scripts:clean"],
  exports["images:clean"],
  exports["fonts:clean"],
)
exports.watch = parallel(
  exports["styles:watch"],
  exports["scripts:watch"],
  exports["images:watch"],
  exports["fonts:watch"],
)
exports.build = parallel(
  exports["styles:build"],
  exports["scripts:build"],
  exports["images:build"],
  exports["fonts:build"],
  exports["shell:drushcr"],
)
exports.serve = series(
  exports.build,
  parallel(exports["sync:init"], exports.watch),
)

// Default `gulp`
exports.default = exports.serve
