import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
                },
                {
                    path: 'about',
                    name: 'about',
                    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
                },
                {
                    path: 'tabs',
                    name: 'tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ './views/Tabs.vue')
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component:Login
        }

    ]
})
