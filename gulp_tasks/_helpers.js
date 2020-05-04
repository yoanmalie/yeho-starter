/*
  Helpers - Reusable functions between tasks
*/

import del from "del"
import browserSync from "browser-sync"
import log from "fancy-log"

// Global paths
const projectRoot = "./"
const paths = {
  source: `${projectRoot}src`,
  public: `${projectRoot}public`,
  assets: "/assets",
}

// Remove .map file
function deleteMap(folder) {
  del(`${folder}/**/*.*.map`)
}

// Determine if the --development flag is used
function isDevelopment() {
  return (
    process.argv.includes("--development") ||
    process.env.NODE_ENV === "development"
  )
}

// Determine if the --production flag is used
function isProduction() {
  return (
    process.argv.includes("--production") ||
    process.env.NODE_ENV === "production"
  )
}

// Browser-sync reload
function reload(done) {
  browserSync.reload()
  done()
}

// Error Handler
const errorHandler = (err) => {
  if (err) {
    log.error("Error: ", err.toString())
  }
}

export {
  projectRoot,
  paths,
  deleteMap,
  isDevelopment,
  isProduction,
  reload,
  errorHandler,
}
