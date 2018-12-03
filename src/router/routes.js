import store from '@state/store'

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
            {
                path: 'tabs',
                name: 'tabs',
                component: () => lazyLoadView(import('@views/Tabs.vue')),
                meta:authRequiredMeta
            }
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

//component: () => import('@views/my-view')
function lazyLoadView(AsyncView) {
    const AsyncHandler = () => ({
        component: AsyncView,
        // A component to use while the component is loading.
        loading: require('./views/_loading').default,
        // Delay before showing the loading component.
        // Default: 200 (milliseconds).
        delay: 400,
        // A fallback component in case the timeout is exceeded
        // when loading the component.
        error: require('./views/_timeout').default,
        // Time before giving up trying to load the component.
        // Default: Infinity (milliseconds).
        timeout: 10000,
    })

    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children)
        },
    })
}