//const mockData = require('./mock/data.json');

module.exports={
  devServer:{
    port:8080,
    proxy:{
      '/api':{
        target:"http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock'
        }
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
} 
