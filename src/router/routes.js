import store from '@state/store'
import {lazyLoadView} from './helper'

const authRequiredMeta={authRequired:true}

export default [
    {
        path:'/',
        name:'index',
        meta:{
            authRequired:true,
            beforeResolve(routeTo, routeFrom, next) {
                store.dispatch('nav/getNavList')
                    .then(navList=>{
                        if(!navList||navList.length<1)
                            next({name:'403'})
                        next()
                    })
                    .catch(error=> {
                        alert('服务请求出错，请检查网络或联系系统管理员！')
                        console.log(error)
                        next({name:'login'})
                    })
            }
        },
        component:()=>lazyLoadView(import('@views/Index')),
        children: [
            {
                path: '',
                name: 'home',
                component: () => lazyLoadView(import('@views/Home.vue')),
                meta: authRequiredMeta
            },
            {
                path: 'about',
                name: 'about',
                component: () => lazyLoadView(import('@views/About.vue')),
                meta:authRequiredMeta
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>lazyLoadView(import('@views/Login')),
        meta:{
            beforeResolve(routeTo,routeFrom,next){
                if(store.getters['auth/loggedIn']){
                    next({name:'home'})
                }else {
                    next()
                }
            }
        }
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                store.dispatch('auth/logOut')
                next({name:'login'})/*
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    route => route.meta.authRequired
                )
                // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })*/
            },
        },
    },
    {
        path: '/404',
        name: '404',
        component: require('./views/_404').default,
        props: true,
    },
    {
        path:'/403',
        name:'403',
        component:require('./views/_403').default,
    },
    {
        path: '*',
        redirect: '404',
    },
]

