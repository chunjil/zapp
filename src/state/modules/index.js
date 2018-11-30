import camelCase from 'lodash/camelCase'

const moduleCache={}
const root = {modules:{}}
;(function updateModules() {
    const requireModule = require.context(
        '.',
        true,
        /^((?!index|\.unit\.).)*\.js$/
    )

    // 遍历 Vuex module
    requireModule.keys().forEach(fileName =>{
        const moduleDefinition=requireModule(fileName)

        // 避免热重载影响
        if(moduleCache[fileName] === moduleDefinition)return

        moduleCache[fileName] = moduleDefinition

        const modulePath = fileName
            .replace(/^\.\//,'')
            .replace(/\.\w+$/,'')
            .split(/\//)
            .map(camelCase)

        // 得到当前路径对应的模块
        const {modules} = getNamespace(root,modulePath)
        modules[modulePath.pop()]={
            namespaced:true,
            ...moduleDefinition,
        }
    })

    if(module.hot){
        module.hot.accept(requireModule.id,() =>{
            updateModules()
            require('../store').default.hotUpdate({modules:root.modules})
        })
    }
})()

function getNamespace(subtree,path) {
    if(path.length ===1)return subtree

    const namespace = path.shift()
    subtree.modules[namespace]={
        modules:{},
        ...subtree.modules[namespace],
    }
    return getNamespace(subtree.modules[namespace],path)
}

export default root.modules