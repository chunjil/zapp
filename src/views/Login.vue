<template>
    <div class="container">
        <el-form :label-position="'top'" label-width="80px" :model="account" @submit.prevent="tryToLogIn">
            <el-form-item label="用户名">
                <el-input
                        v-model="account.name"
                        placeholder="请输入用户名"
                        clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="account.psw" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="tryToLogIn">登录</el-button>
            </el-form-item>
            <el-alert
                    title="错误的账号或密码"
                    v-show="errorTip"
                    type="error">
            </el-alert>
        </el-form>
    </div>
</template>

<script>
    import {setCookie} from 'tiny-cookie'
    import { authMethods } from '@state/helpers'
    import appConfig from '@src/app.config'

    export default {
        name: "Login",
        data() {
            return {
                account: {name: '', psw: ''},
                errorTip:false,
                tryingToLogIn:false,
                authError:null,
            }
        },
        methods:{
            ...authMethods,
            tryToLogIn(){
              this.tryingToLogIn=true
              this.authError=null
                return this.logIn({
                    username:this.account.name,
                    password:this.account.psw
                })
                    .then(token =>{
                        this.tryingToLogIn=false
                        this.$router.replace(this.$route.query.redirectFrom || {name:'home'})
                    })
                    .catch(error=>{
                        this.tryingToLogIn=false
                        this.authError=error
                    })
            },
            onSubmit(){
                doLogin(this.account)?this.$router.replace({name:'index'}):this.errorTip=true;
            }
        }
    }
    let doLogin=(account)=>{
        if(account.name==='admin'&&account.psw==='123'){
            setCookie('account',account.name);
            return true;
        }
    }
</script>

<style scoped>

</style>