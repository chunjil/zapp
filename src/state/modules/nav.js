import axios from 'axios'
import {getSavedState, saveState} from "../helpers"
import apis from "../apis";

//获取当前用户权限下的导航

export const state = {
    currentNavList: getSavedState('nav.currentNavList')||[]
}

export const mutations = {
    SET_CURRENT_NAV_LIST(state, navList) {
        state.currentNavList = navList
        saveState('nav.currentNavList', navList)
    }
}

export const getters = {
    navListLoaded(state) {
        return !!state.currentNavList && state.currentNavList.length > 0
    }
}

export const actions = {
    getNavList({commit, getters, state}) {
        if (getters.navListLoaded) {
            return Promise.resolve(state.currentNavList);
        }
        /*在完成登录后，在axio的请求header中设置了token，服务端则可以识别当前登录人
        let currentUser=rootState.currentUser
        let userID=currentUser.id;*/
        return axios.get(apis.GET_HUMAN_NAV_LIST)
            .then(resp => {
                const navList = resp.data
                /*if(!navList.find(x=>x.name==='logout'))navList.add({name:'logout',''})*/
                commit('SET_CURRENT_NAV_LIST',navList)
                return navList
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    commit('SET_CURRENT_NAV_LIST', null)
                }
                return null
            })

    }
}

