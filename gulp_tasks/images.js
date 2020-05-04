/*
  Images tasks
*/

import { src, dest, watch, series } from "gulp"
import pump from "pump"
import del from "del"
import newer from "gulp-newer"
import imagemin from "gulp-imagemin"

// Global helpers
import { paths, reload, errorHandler } from "./_helpers"

// Images paths
const img = {
  src: `${paths.source + paths.assets}/img`,
  dest: `${paths.public + paths.assets}/img`,
  entry: "/**/*",
  static: "/static",
  extensions: ["png", "jpg", "jpeg", "gif", "svg"],
}

// Compress images
async function compressed() {
  await pump(
    [
      src([
        `${img.src + img.entry}.{${img.extensions}}`,
        `!${img.src + img.static + img.entry}`,
      ]),
      newer(img.dest),
      imagemin([
        imagemin.gifsicle({ interlaced: true, optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true, quality: 75 }),
        imagemin.optipng({ interlaced: true, optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: false },
            { removeUnknownsAndDefaults: false },
            {
              addAttributesToSVGElement: {
                attributes: [{ focusable: "false" }, { "aria-hidden": "true" }],
              },
            },
          ],
        }),
      ]),
      dest(img.dest),
    ],
    errorHandler,
  )
}

// Move unchanged images
async function unchanged() {
  await pump([
    src(`${img.src + img.static + img.entry}.{${img.extensions}}`),
    newer(`${img.dest + img.static}`),
    dest(`${img.dest + img.static}`),
  ])
}

// Build images task
const imgBuild = series(compressed, unchanged)
imgBuild.description = "Compress image files"

// Watch images task
async function imgWatch() {
  const watcher = await watch(
    `${img.src + img.entry}`,
    series(imgBuild, reload),
  )
  return watcher
}
imgWatch.description = "Watch image files changes"

// Clean images task
function imgClean() {
  return del(img.dest)
}
imgClean.description = `Delete the ${img.dest} folder`

export { imgBuild, imgWatch, imgClean }
