<template>
    <div class="pager-container">
        <el-row class="app-head"
                style="position: relative;height: 85px;">
            <el-col class="app-logo-container" :span="8" style="height: 100%">
                <span class="app-logo height-100"></span>
                <span class="app-logo-text">自然资源综合管理</span>
                <div class="line linecolor" style="width: 100%;left: 35px;position: relative;bottom: 12px;"></div>

            </el-col>

            <el-col class="nav-container" :span="16" style="position: relative;height: 100%">

                <div class="line linecolor" style="width: calc(100% - 70px);top: 29px;left: 36px;"></div>
                <div class="line linecolor skewstyle" style="left: 18px;"></div>
                <div class="line linecolor skewstyle" style="left: 26px;"></div>
                <div class="line linecolor skewstyle" style="left: 34px;"></div>
                <div class="line linecolor" style="width: 19px;left: 0;"></div>
                <div class="app-nav" data-bind="foreach: router.navigationModel">

                    <router-link tag="div" class="app-nav-item select" :to="{name:'home'}">
                        <span>规划一张图</span>
                    </router-link>

                    <div class="app-nav-item">
                        <span>规划审批</span>
                    </div>

                    <div class="app-nav-item">
                        <span>阳光规划</span>
                    </div>

                    <div class="app-nav-item">
                        <span>园林绿化</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="app-main">
            <transition :name="transitionName">
                <router-view class="child-view"></router-view>
            </transition>
        </div>
    </div>

    <!--<page-layout class="pager-container">
        <app-logo slot="logo"></app-logo>
        <nav-bar slot="nav"></nav-bar>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </page-layout>-->

</template>

<script>
    import {navMethods, navComputed} from '@state/helpers'
    import navBar from '@components/nav-bar'
    import appLogo from '@components/app-logo'
    import pageLayout from '@layouts/page'

    const TRANSITION_NAME = {'SLIDE-LEFT': 'slide-left', 'SLIDE-RIGHT': 'slide-right'}


    export default {
        name: "Index",
        components: {navBar, appLogo, pageLayout},
        data() {
            return {
                navList: [],
                transitionName: TRANSITION_NAME["SLIDE-LEFT"]
            }
        },
        computed: {
            ...navComputed
        },
        methods: {
            ...navMethods,
        },
        created: () => {
        },

        watch: {
            '$route'(to, from) {
                debugger
                const toNav = this.currentNavList.find((x) => {
                    return x.name === to.name
                })
                const fromNav = this.currentNavList.find((x) => {
                    return x.name === from.name
                })
                this.transitionName = fromNav.displayOrder < toNav.displayOrder ? TRANSITION_NAME["SLIDE-LEFT"] : TRANSITION_NAME["SLIDE-RIGHT"]
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*@import '@design'*/
    .app-main {
        margin: 2em 3em;
    }

    .app-logo {
        background: url(../assets/logo.png) no-repeat center center;
        background-size: contain;
        width: 100px;
        display: inline-block;
        margin-left: 25px;
        margin-top: 6px;
        height: 100%;
    }

    .app-logo-text {
        font-size: 38px;
        white-space: nowrap;
        font-style: italic;
        position: absolute;
        height: 100%;
        line-height: 95px;
    }

    .line {
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 100%;
        background-color: #6981EE;
    }

    .app-nav {
        position: absolute;
        left: 40px;
        height: 52px;
        bottom: 0;
        font-size: 22px;
    }

    .app-nav-item {
        width: 130px;
        float: left;
        text-align: center;
        transform: skew(-32deg);
        line-height: 52px;
        margin-right: 3px;
        cursor: pointer;
        background-color: #364686;
        color: #fff;
    }

    .app-nav-item.select,
    .app-nav-item.router-link-active {
        background-color: #00a0e9;
    }

    .app-nav-item span {
        color: #1a2233;
        text-decoration: none;
        transform: skew(30deg);
        display: inline-block;
    }

    .skewstyle {
        width: 2px;
        height: 55px;
        transform: skew(-32deg);
    }

    .pager-container {
        color: #f9f7f5;
        left: 35px;
    }

    .main-container {
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
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }
</style>