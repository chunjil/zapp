import axios from 'axios'

const SET_CURRENT_USER='SET_CURRENT_USER'
const CURRENT_USER='auth.currentUser'

export const state={
    currentUser:getSavedState(CURRENT_USER),
}

export const mutations ={
    SET_CURRENT_USER(state,newValue){
        state.currentUser = newValue
        saveState(CURRENT_USER,newValue)
        setDefaultAuthHeaders(state)
    }
}

export const getters ={
    loggedIn(state){
        return !!state.currentUser
    }
}

export const action ={
    init({state,dispatch}){
        setDefaultAuthHeaders(state)
        dispatch('validate')
    },

    logIn({commit,dispatch,getters},{username,password}={}){
        debugger
        if(getters.loggedIn)return dispatch('validate')

        return axios.post('/api/session',{username,password})
            .then(resp=>{
                const user=resp.data
                commit(SET_CURRENT_USER,user)
                return user
            })
    },

    logOut({commit}){
        commit(SET_CURRENT_USER,null)
        //todo 通知服务器
    },

    validate({commit,state}){
        if(!state.currentUser)return Promise.resolve(null)

        return axios
            .get('/api/session')
            .then(resp =>{
                const user=resp.data;
                commit(SET_CURRENT_USER)
                return user;
            })
            .catch(err=>{
                if(err.response&&err.response.status===401){
                    commit(SET_CURRENT_USER,null)
                }
                return null
            })
    }
}


function setDefaultAuthHeaders(state) {
    axios.defaults.headers.common.Authorization = state.currentUser
        ? state.currentUser.token
        : ''
}

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}