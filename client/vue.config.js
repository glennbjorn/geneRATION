const path = require('path');

if (process.env.NODE_ENV === "development") {
    require('dotenv').config();
    module.exports = {
        outputDir: path.resolve(__dirname, '../server/public'),
        devServer: {
            proxy: {
                '^/api': {
                    target: process.env.BACKEND_URL,
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
                    target: process.env.BACKEND_URL,
                    changeOrigin: true,
                    secure:false,
                    pathRewrite: {'^/api': '/'},
                    logLevel: 'debug' 
                },
            }
        }
    }
}

