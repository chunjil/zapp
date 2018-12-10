<template>
    <div class="app-container dark-blue-designer">
        <el-row class="app-header">
            <el-col class="app-logo-container" :span="8">
                <span class="app-logo"></span>
                <span class="app-logo-text">{{appConfig.appTitle}}</span>
                <div class="line-decorator" style="left: 35px;right: 0;width: auto"></div>
            </el-col>

            <el-col class="app-nav-container" :span="16">

                <div class="line-decorator" style="width: calc(100% - 70px);top: 29px;left: 36px;"></div>
                <div class="line-decorator line-skew" style="left: 18px;"></div>
                <div class="line-decorator line-skew" style="left: 26px;"></div>
                <div class="line-decorator line-skew" style="left: 34px;"></div>
                <div class="line-decorator" style="width: 19px;left: 0;"></div>
                <div class="app-nav-list">
                    <router-link
                            tag="div"
                            v-for="(item,index) in currentNavList"
                            class="app-nav-item"
                            :key="index"
                            :to="item"
                    ><span class="app-nav-item-text">{{item.title}}</span>
                    </router-link>
                </div>
            </el-col>
        </el-row>

        <div class="app-main-container">
            <transition :name="transitionName">
                <router-view class="child-view app-main"></router-view>
            </transition>
        </div>
    </div>

</template>

<script>
    import {appConfigMethods, navMethods, navComputed, configComputed} from '@state/helpers'

    //注册echarts主题
    import echarts from 'echarts';
    import data from './echarts.json'
    echarts.registerTheme('dark-blue', data)
    //js中需要访问的样式值
    import design from './dark-blue.scss'
    import statelessStore from '@state/stateless-store'
    console.log(design)
    statelessStore.style= design
    console.log(statelessStore)


    const TRANSITION_NAME = {'SLIDE-LEFT': 'slide-left', 'SLIDE-RIGHT': 'slide-right'}
    export default {
        name: "dark-blue-pager",

        data() {
            return {
                transitionName: TRANSITION_NAME["SLIDE-LEFT"]
            }
        },
        props: {
            route: {
                required: true
            }
        },
        computed: {
            ...configComputed,
            ...navComputed
        },
        methods: {
            ...appConfigMethods,
            ...navMethods
        },

        watch: {
            'route'(to, from) {
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

<style lang="scss">
    @import "dark-blue";

    $app-header-height: 85px;

    .app-container.dark-blue-designer {
        color: $color-text;
        left: 35px;
        height: 100%;
        overflow: hidden;

        .app-header {
            position: relative;
            height: $app-header-height;

            //logo & title
            .app-logo-container {
                height: 100%;
                position: relative;

                .app-logo {

                    background: url('../../assets/logo.png') no-repeat center center;
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
            }

            //导航
            .app-nav-container {
                position: relative;
                height: 100%;

                .app-nav-list {
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

                    .app-nav-item-text {
                        color: #1a2233;
                        text-decoration: none;
                        transform: skew(30deg);
                        display: inline-block;
                    }
                    &.router-link-exact-active {
                        background-color: #00a0e9;
                    }
                }

            }
        }

        // 主体部分
        .app-main-container {
            width: calc(100% - 85px);
            height: calc(100% - 125px);
            padding: 20px 20px 5px 40px;
            overflow: hidden;

            .app-main{
                height: 100%;
            }
        }

        .line-decorator {
            position: absolute;
            bottom: 0;
            height: 2px;
            width: 100%;
            background-color: #6981EE;
        }

        .line-skew {
            width: 2px;
            height: 55px;
            transform: skew(-32deg);
        }
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
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }
</style>