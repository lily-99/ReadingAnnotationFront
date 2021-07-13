module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    host: '127.0.0.1',
    // headers:{
    //   'Access-Control-Allow-Origin':'*',
    // },
    // hotOnly:false,
    // disableHostCheck:true
  },
}