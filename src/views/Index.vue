<template>
    <div class="main-container">
        <app-logo></app-logo>
        <nav-bar></nav-bar>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
    import {navMethods, navComputed} from '@state/helpers'
    import navBar from '@components/nav-bar'
    import appLogo from '@components/app-logo'

    const TRANSITION_NAME = {'SLIDE-LEFT': 'slide-left', 'SLIDE-RIGHT': 'slide-right'}


    export default {
        name: "Index",
        components: {navBar,appLogo},
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
    .app-nav {
        cursor: pointer;
        list-style: none;
        display: inline-block;

        .nav-active {

        }
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