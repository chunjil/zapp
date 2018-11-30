import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules,
    // 运行在开发模式下得到必要的调试信息
    strict:process.env.NODE_ENV !=='production'
})

for (const moduleName of Object.keys(modules)){
    if(modules[moduleName].actions && modules[moduleName].actions.init){
        store.dispatch(`${moduleName}/init`)
    }
}

export default store