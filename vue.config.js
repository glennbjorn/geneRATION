module.exports = {
    devServer: {
        proxy: {
            '^/backend': {
                target: 'https://localhost:4000',
                pathRewrite: { '^/backend': '/' }
            }
        }
    }
}