module.exports = {
  extends: ["airbnb-base", "prettier", "prettier/react"],
  env: {
    browser: true,
  },
  parser: "babel-eslint",
  plugins: ["prettier"],
  rules: { "prettier/prettier": "error" },
}
