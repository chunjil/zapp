<script>
    import {authComputed, navMethods,navComputed} from '@state/helpers'
    import NavBarRoutes from './nav-bar-routes'

    export default {
        components: {NavBarRoutes},
        data() {
            return {
            }
        },
        computed: {
            ...authComputed,
            ...navComputed
        },
        prop:{
            navList:{
                type:Array,
                require:true
            }
        },
        method: {
            ...navMethods
        },
        /*
        created() {
            this.getNavList().then(navList => {
                this.navList = navList
            }).catch(error => {
                console.log(error)
            })
        },*/
    }
</script>

<template>
    <ul :class="$style.container">
        <NavBarRoutes :routes="currentNavList"/>
        <nav-bar-routes :routes="[{name:'logout',title:'退出'}]"/>
        <!--<NavBarRoutes
                v-if="loggedIn"
                :routes="loggedInNavRoutes"
        />
        <NavBarRoutes
                v-else
                :routes="loggedOutNavRoutes"
        />-->
    </ul>
</template>

<style lang="scss" module>
    @import '@design/index.scss';

    .container {
        padding: 0;
        margin: 0 0 $size-grid-padding;
        text-align: center;
        list-style-type: none;

        > li {
            display: inline-block;
            margin-right: $size-grid-padding;
        }
    }
</style>
