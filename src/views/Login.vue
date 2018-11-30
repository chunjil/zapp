<template>
    <div class="container">
        <el-form :label-position="'top'" label-width="80px" :model="account">
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
                <el-button type="primary" @click="onSubmit">登录</el-button>
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
    export default {
        name: "Login",
        data() {
            return {
                account: {name: '', psw: ''},
                errorTip:false
            }
        },
        methods:{
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