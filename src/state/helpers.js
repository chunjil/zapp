import {mapState, mapGetters, mapActions} from 'vuex'

export const authComputed = {
    ...mapState('auth', {
        currentUser: state => state.currentUser,
    }),
    ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

//导航
export const navComputed = {
    ...mapState('nav', {
        currentNavList: state => state.currentNavList
    }),
    ...mapGetters('nav', ['navListLoaded'])
}
export const navMethods = mapActions('nav', ['getNavList'])



//应用配置
export const configComputed = {
    ...mapState('config',{
            appConfig: state => state.appConfig,
        })
}
export const appConfigMethods=mapActions('config',['getAppConfig'])




//工具方法
export const getSavedState = key => {
    try {
        return JSON.parse(window.localStorage.getItem(key))
    }
    catch (e) {
        return null
    }
}

export const saveState = (key, state) => window.localStorage.setItem(key, JSON.stringify(state))

