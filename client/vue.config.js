const path = require('path');

if (process.env.NODE_ENV === "development") {
    module.exports = {
        outputDir: path.resolve(__dirname, '../server/public'),
        devServer: {
            proxy: {
                '^/api': {
                    target: 'http://localhost:4000',
                    changeOrigin: true,
                    secure:false,
                    pathRewrite: {'^/api': '/'},
                    logLevel: 'debug' 
                },
            }
        }
    }
}

if (process.env.NODE_ENV === "production") {
    module.exports = {
        outputDir: path.resolve(__dirname, '../server/public'),
        devServer: {
            proxy: {
                '^/api': {
                    target: 'https://new-generation.herokuapp.com',
                    changeOrigin: true,
                    secure:false,
                    pathRewrite: {'^/api': '/'},
                    logLevel: 'debug' 
                },
            }
        }
    }
}

