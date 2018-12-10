<!-- 通过引入布局组件方便后期切换页面风格 -->
<template>
    <page-layout v-bind:route="$route">
        <!--<template slot="app-title">
            {{appConfig.appTitle}}
        </template>
        <template slot="app-nav">
            <router-link
                    tag="div"
                    v-for="(item,index) in navList"
                    class="app-nav-item"
                    :key="index"
                    :to="item"
            ><span class="app-nav-item-text" >{{item.title}}</span>
            </router-link>
        </template>
        <transition :name="transitionName">
            <router-view class="child-view app-main"></router-view>
        </transition>-->
    </page-layout>
</template>

<script>


import store from '@state/store'
import Vue from 'vue'

const theme=store.getters['config/appTheme'].name||'dark-blue'
Vue.component('databox',() => import('../design/'+theme+'/databox'))


    export default {
        name: "Index",
        components: {'pageLayout':()=>import('../design/'+theme+'/'+theme+'-layout')},
    }
</script>

