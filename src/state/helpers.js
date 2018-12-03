import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: state => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const navComputed={
  ...mapState('nav',{
    currentNavList:state=>state.currentNavList
  }),
    ...mapGetters('nav',['navListLoaded'])
}
export const navMethods = mapActions('nav', ['getNavList'])



export const getSavedState=key=>{
  try {
      return JSON.parse(window.localStorage.getItem(key))
  }
  catch (e) {
      return []
  }
}

export const saveState=(key, state) =>window.localStorage.setItem(key, JSON.stringify(state))

