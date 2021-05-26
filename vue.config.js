module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
      //before: require('./src/mock/index.js')
    }
  },
}