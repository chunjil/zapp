import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress/nprogress'
import store from '@state/store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode:'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

router.beforeEach((routeTo,routeFrom,next)=>{
    if(routeFrom !== null ){
        NProgress.start()
    }
    const authRequired = routeTo.matched.some(route => route.meta.authRequired)

    if(!authRequired) return next()

    if(store.getters['auth/loggedIn']){
        return store.dispatch('auth/validate').then(validUser =>{
            validUser?next():redirectToLogin()
        })
    }

    redirectToLogin()

    function redirectToLogin() {
        next({ name:'login',query: {redirectFrom: routeTo.fullPath}})
    }
})


router.beforeResolve(async (routeTo, routeFrom, next) => {
    try {
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        if (args.length) {
                            if (routeFrom.name === args[0].name) {
                                NProgress.done()
                            }
                            next(...args)
                            reject(new Error('Redirected'))
                        } else {
                            resolve()
                        }
                    })
                } else {
                    resolve()
                }
            })
        }
    } catch (error) {
        return
    }

    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router