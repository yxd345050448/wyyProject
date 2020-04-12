module.exports={
    assetsDir:'static',
    publicPath:'/',
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
            target: "http://localhost:3000",
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': 'http://localhost:3000'
            }
          },
        },
    },
}