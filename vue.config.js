module.exports = {
    devServer: {
        proxy: {
            '^/backend': {
                target: 'https://localhost:4000',
                pathRewrite: { '^/backend': '/' }
            },
            '^/frontend': {
                target: 'https://localhost:5000',
                pathRewrite: { '^/frontend': '/' }
            }
        }
    }
}