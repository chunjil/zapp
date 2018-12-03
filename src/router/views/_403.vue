<script>

    export default {
        page: {
            title: '403',
        },
        data() {
            return {
                count: 10
            }
        },
        mounted() {
            setTimeout(this.count--, 1000)
        },
        watch: {
            count(to) {
                if (to === 0)
                    this.$route.replace({name: 'login'})
            }
        }
    }
</script>

<template>
    <h1 :class="$style.title">
        403：
        当前用户没有任何导航权限
    </h1>

</template>

<style lang="scss" module>
    .title {
        text-align: center;
    }
</style>
