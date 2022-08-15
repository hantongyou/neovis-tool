const {createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function(app) {
 
   app.use(createProxyMiddleware('/graphBackend', {
    target: 'http://127.0.0.1:8000',
    pathRewrite: {
      '^/graphBackend': '',
    },
    changeOrigin: true,
    secure: false
}));
}