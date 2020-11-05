/*
  Shell tasks
*/

import cp from "child_process"

async function drushCr(cb) {
  const cmd = cp.spawn("drush clear:cache", [], {
    stdio: "inherit",
    shell: true,
  })
  return cmd.on("close", cb)
}
drushCr.description = "Run drush clear:cache"

export default drushCr
