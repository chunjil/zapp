<template>
    <div>
        <div v-show="initializing">正在加载</div>
        <div class="main-container" v-show="!initializing">
            <ul id="nav">
                <router-link
                        v-for="nav in navList"
                        :key="nav.name"
                        :to="nav"
                        tag="li"
                        class="app-nav">
                    {{nav.display}}
                </router-link>
            </ul>
            <transition :name="transitionName">
                <router-view class="child-view"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    import {getCookie} from 'tiny-cookie'

    function hasLogin() {
        let cAccount = getCookie('account');
        if (cAccount && cAccount != null) {
            return true;
        }
        return false;
    }

    function doGetNavList() {

        return [
            {name: 'home', display: '规划一张图',index:0},
            {name: 'about', display: '规划审批',index:2},
        ]
    }
    const TRANSITION_NAME={'SLIDE-LEFT':'slide-left','SLIDE-RIGHT':'slide-right'}


    export default {
        name: "Index",
        data() {
            return {
                initializing: true,
                navList: [],
                transitionName:TRANSITION_NAME["SLIDE-LEFT"]
            }
        },
        methods: {},
        beforeCreate: function () {
            if (hasLogin()) {
                return router.replace({name: 'home'})
            }
            router.replace('login')
        },
        created: () => {
        },
        mounted: function () {
            let navList = doGetNavList()
            if (navList && navList.length > 0){
                this.navList = navList
                this.initializing=false
            }
        },
        updated: function () {
            console.log('index updated!')
        },
        watch:{
            '$route'(to,from){
                const toNav=this.navList.find((x)=>{return x.name==to.name})
                const fromNav=this.navList.find((x)=>{return x.name==from.name})
                this.transitionName=fromNav.index<toNav.index?TRANSITION_NAME["SLIDE-LEFT"]:TRANSITION_NAME["SLIDE-RIGHT"]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-nav{
        cursor:pointer;
        list-style:none;
        display: inline-block;

        .nav-active{

        }
    }

    /*.slide-left-enter-active,
    .slide-right-enter-active{
        transition: all .3s ease;
    }
    .slide-left-leave-active,
    .slide-left-leave-active{
        transition: all .3s cubic-bezier(1.0,0.5,0.8,1.0);
    }
    .slide-left-leave{
        transform: translateX(-2300px);
        opacity: 0;
    }
    .slide-fade-enter{
        transform: translateX(2300px);
        opacity: 0;
    }*/

    .main-container{
        overflow-x: hidden;
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(2230px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-2230px, 0);
    }
    .child-view {
        position: absolute;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    /* .fade-enter-active, .fade-leave-active {
         transition: opacity .5s ease;
     }
     .fade-enter, .fade-leave-active {
         opacity: 0
     }*/
</style>