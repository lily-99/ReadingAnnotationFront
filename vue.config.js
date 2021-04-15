module.exports = {
    lintOnSave: false,
    devServer: {
      overlay: {
        warnings: false,
        errors: true,
        //before: require('./src/mock/api.js')
      }
    }
  }