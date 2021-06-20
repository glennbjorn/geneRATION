const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '^/backend': {
                target: 'https://localhost:4000',
                pathRewrite: { '^/backend': '/' }
            }
        }
    }
}