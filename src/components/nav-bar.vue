<script>
    import {authComputed, navMethods,navComputed} from '@state/helpers'
    import NavBarRoutes from './nav-bar-routes'

    export default {
        components: {NavBarRoutes},
        data() {
            return {
                persistentNavRoutes: [
                    {
                        name: 'home',
                        title: 'Home',
                    },
                ],
                loggedInNavRoutes: [
                    {
                        name: 'profile',
                        title: () => 'Logged in as ' + this.currentUser.name,
                    },
                    {
                        name: 'logout',
                        title: 'Log out',
                    },
                ],
                loggedOutNavRoutes: [
                    {
                        name: 'login',
                        title: 'Log in',
                    },
                ],
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
        updated(){
            debugger
            console.log(this.currentNavList)
        }
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
    @import '@design';

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
