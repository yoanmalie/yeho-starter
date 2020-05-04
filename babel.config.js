const presets = [
  [
    "@babel/preset-env",
    {
      corejs: 3,
      useBuiltIns: "usage",
    },
  ],
]

const plugins = [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-class-properties",
  ["@babel/plugin-transform-runtime", { regenerator: false, corejs: 3 }],
]

const exclude = /node_modules\/.*/

module.exports = { presets, plugins, exclude }
