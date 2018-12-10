/**
 *  应用全局信息获取及存储
 *
 *
 *
 *  appConfig:{
 *      appTitle 应用标题
 *      gisServer GIS服务地址
 *      baseMap 登陆页背景图
 *      proxyUrl 代理服务器地址
 *  }
 *
 *  appTheme:{
 *      name:?//default:dark-blue
 *  }
 */

import axios from 'axios'
import {getSavedState,saveState} from "../helpers";
import APIS from '../apis'

const APP_CONFIG='appConfig'

export const state = {
    appConfig: getSavedState('appConfig')||{},
    appTheme:getSavedState('appTheme')||{}

}

export const mutations = {
    SET_APP_CONFIG(state, newValue) {
        state.appConfig = newValue
        saveState('appConfig', newValue)
    },
    SET_APP_THEME(state, newValue) {
        state.appTheme = newValue
        saveState('appTheme', newValue)
    },
}
export const getters = {
    appTheme(state){
        return state.appTheme
    },
    appConfig(state){
        return state.appConfig
    }
}

export const actions = {

    init({dispatch}){
        dispatch('getAppConfig')
        dispatch('getAppTheme')
    },

    getAppConfig({commit,state}) {
        if(state.appConfig&&state.appConfig.appTitle) return Promise.resolve(state.appConfig)

        return axios.get(APIS.GET_APP_CONFIG).then(response => {
            const appConfig = response.data
            commit('SET_APP_CONFIG', appConfig)
            return appConfig
        })
    },

    getAppTheme({commit,state}){
        if(state.appTheme&& state.appTheme.name)return Promise.resolve(state.appTheme)
        return axios.get(APIS.GET_APP_THEME).then(response =>{
            const appTheme=response.data
            commit('SET_APP_THEME',appTheme)
            return appTheme
        })
    }
}

