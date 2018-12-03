<template>
    <div class="app-logo">
            {{title}}
    </div>
</template>

<script>
    export default {
        computed: {
            title: () => '规划一张图管理系统'
        }
    }
</script>

<style scoped>
    .app-logo{
        position: relative;
        display: inline-block;
        padding: .3em 1em 0;
    }

    .app-logo::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #ccc;
        background-image: linear-gradient(hsla(0, 0%, 100%, .6), hsla(0, 0%, 100%, 0));
        border: 1px solid rgba(0, 0, 0, .4);
        border-bottom: none;
        border-radius: .5em .5em 0 0;
        box-shadow: 0 .15em white inset;
        transform: perspective(.5em) rotateX(5deg);
        transform-origin: bottom;
    }
</style>