const path = require('path')
const appConfig = require('./src/app.config')

module.exports = {
    //给所有模块注入公用样式
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
    },
    configureWebpack: {
        name: appConfig.title,//注入网页标题
        resolve: {
            alias: {//设置代码中引用的别名
                '@': '.',
                '@src': 'src',
                '@router': 'src/router',
                '@views': 'src/router/views',
                '@layouts': 'src/router/layouts',
                '@components': 'src/components',
                '@assets': 'src/assets',
                '@utils': 'src/utils',
                '@state': 'src/state',
                '@design': 'src/design/index.scss',},
        },
    },
}

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/imports.scss'),
            ],
        })
}