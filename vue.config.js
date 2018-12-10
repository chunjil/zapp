const path = require('path')
const appConfig = require('./src/app.config')
const _ = require('lodash')

module.exports = {
    chainWebpack: config => {

        //给所有模块注入公用样式
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))

        //設置別名
        let aliases = require('./aliases.config').webpack
        if (aliases)
            _.forEach(aliases, (v, k) => {
                config.resolve.alias.set(k, v)
            })

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    devServer: {
        ...(process.env.API_BASE_URL
            ? // Proxy API endpoints to the production base URL.
            {proxy: {'/api': {target: process.env.API_BASE_URL}}}
            : // Proxy API endpoints a local mock API.
            {before: require('./tests/mock-api')}),
    },
    css: {
        // Enable CSS source maps.
        sourceMap: true,
        loaderOptions:{
            sass:{
                includePaths: ['./node_modules'],/*
                data: `@import "@design/import";`*/
            }
        }
    },
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/design/index.scss'),
            ],
        })
}