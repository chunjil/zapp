<template>
    <div>
        <div v-show="initializing">正在加载</div>
        <div id="nav">
            <router-link to="{name:'home'}">Home</router-link>
            <router-link to="{name:'about'}">About</router-link>
            <router-link to="{name:'tabs'}">Tabs</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import router from "../router";
    import Vue from 'vue'
    let hasLogin=()=>{
        if(Vue.$cookie.get('account'))
            return true;
        return false;
    }

    export default {
        name: "Index",
        data(){
            return {
                initializing:true,
            }
        },
        methods:{
            hasLogin(){
                if(this.$cookie.get('account'))
                    return true;
                return false;
            }
        },
        created: () => {
            if (!(hasLogin())) {
                router.replace('login')
                return
            }
            this.initializing=false
            router.replace('home')
        }
    }
</script>

<style scoped>

</style>