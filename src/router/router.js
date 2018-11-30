import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'nav-active',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
                },
                {
                    path: 'about',
                    name: 'about',
                    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
                },
                {
                    path: 'tabs',
                    name: 'tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../views/Tabs.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }

    ]
})

function lazyLoadView(AsyncView) {
    const AsyncHandler = () => ({
        component: AsyncView,
        // A component to use while the component is loading.
        loading: require('@views/_loading').default,
        // Delay before showing the loading component.
        // Default: 200 (milliseconds).
        delay: 400,
        // A fallback component in case the timeout is exceeded
        // when loading the component.
        error: require('@views/_timeout').default,
        // Time before giving up trying to load the component.
        // Default: Infinity (milliseconds).
        timeout: 10000,
    })
    return Promise.resolve({
        functional: true,
        render(h, {data, children}) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children)
        },
    })
}
