module.exports = {
  lintOnSave: false,
  devServer:{
    port:8081,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //       target: 'http://127.0.0.1:8000',
    //       changeOrigin: true
    //   }
    // }
  }
}
