import path from "path"
import TerserPlugin from "terser-webpack-plugin"

// Global paths and helpers
import { paths, isProduction, isDevelopment } from "./gulp_tasks/_helpers"

// Scripts paths
const js = {
  src: `${paths.source + paths.assets}/js`,
  dest: `${paths.public + paths.assets}/js`,
  entry: "/main",
  extensions: "js",
  name: "app",
}

const config = {
  mode: isProduction() ? "production" : "development",
  entry: path.resolve(__dirname, `${js.src + js.entry}.${js.extensions}`),
  output: {
    filename: `${js.name}.${js.extensions}`,
    path: path.resolve(__dirname, js.dest),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    minimize: isProduction(),
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
}

if (isDevelopment()) {
  config.devtool = "source-map"
}

module.exports = config
