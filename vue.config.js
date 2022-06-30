const {defineConfig} = require('@vue/cli-service')

let proxyObj = {}
proxyObj['/'] = {
    // websocket
    ws: false,
    target: 'http://0.0.0.0:8081',
    // 发送请求头host会被设置成target
    changeOrigin: true,
    // 不重写请求地址
    pathReWrite: {
        '^/': '/'
    }
}

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        proxy: proxyObj
    }
})
