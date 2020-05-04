/*
  Browser-sync tasks
*/

import os from "os"
import fs from "fs"
import browserSync from "browser-sync"

// Global helpers
import { paths } from "./_helpers"

// Browser Processes depending of the Operating System
// darwin = macOS
// linux = Linux distributions
// win32 = Windows
const browsersProcesses = {
  chrome: {
    darwin: "google chrome",
    linux: "google-chrome",
    win32: "chrome",
  },
  firefox: {
    darwin: "firefox",
    linux: "firefox",
    win32: "firefox",
  },
}

// Chose a browser to run
// It's Chrome by default or run Firefox with the --firefox flag
let browser = "chrome"
if (process.argv.includes("--firefox")) {
  browser = "firefox"
}
const browserProcess = browsersProcesses[browser][os.platform()]

// Virtual host (vhost)
// Use the vhost config file if exist
const vhostFile = "./.vhost.js"
const vhostEnv = fs.existsSync(vhostFile) ? require("../.vhost") : false // eslint-disable-line import/no-unresolved, import/no-dynamic-require

// Base directory depending if there a vhost used
let server = false
if (!vhostEnv) {
  server = {
    baseDir: paths.public,
  }
}

// Where Browser-sync look for files changes
let webRoot = `"${paths.public}"`
if (vhostEnv) {
  webRoot = "." // vhost already point on the public folder
}
const syncFiles = [`${webRoot}/**/*`]

// Browser-sync server task
function syncInit(done) {
  browserSync.init({
    proxy: vhostEnv,
    server,
    files: syncFiles,
    watch: true,
    port: 3000,
    notify: false,
    reloadDelay: 250,
    browser: browserProcess,
  })
  done()
}
syncInit.description =
  "Start files synchronization in the browser through Browser-Sync server"
syncInit.flags = {
  "(default)": "Open in Google Chrome",
  "--firefox": "Open in Firefox",
}

export default syncInit
