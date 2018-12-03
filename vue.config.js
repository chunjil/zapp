const path = require('path')
const appConfig = require('./src/app.config')
const _ = require('lodash')

module.exports = {
    chainWebpack: config => {
        //给所有模块注入公用样式
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))


        let aliases=require('./aliases.config').webpack
        if(aliases)
            _.forEach(aliases,(v,k)=>{config.resolve.alias.set(k,v)})

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    devServer: {
        ...(process.env.API_BASE_URL
            ? // Proxy API endpoints to the production base URL.
            { proxy: { '/api': { target: process.env.API_BASE_URL } } }
            : // Proxy API endpoints a local mock API.
            { before: require('./tests/mock-api') }),
    },
    /*configureWebpack: config => {

        return {
            name: appConfig.title,//注入网页标题
            resolve: {
                alias: {//设置代码中引用的别名
                    '@': '.',
                    '@src': 'src',
                    '@router': 'src/router',
                    '@views': 'src/views',
                    '@layouts': 'src/router/layouts',
                    '@components': 'src/components',
                    '@assets': 'src/assets',
                    '@utils': 'src/utils',
                    '@state': 'src/state',
                    '@design': 'src/design/index.scss',
                },
            }
        }
    },*/
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/design/imports.scss'),
            ],
        })
}