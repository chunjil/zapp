<template>
    <div :class="$style.nlogo">
        <!--<label :class="$style.title">-->
        <span class="app-screen-desktop-logo height-100"></span>
        <span class="app-screen-desktop-logo-text">杭州市智慧城管运行监督指挥系统</span>
            {{title}}
        <!--</label>-->
    </div>
</template>

<script>
    export default {
        computed: {
            title: () => '规划一张图管理系统'
        }
    }
</script>

<style module>

    .nlogo {
        height: 0;
        width: 100%;
        border-bottom: 50px solid #e5c3b2;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        display: inline-block;
    }
    .title{

        padding: .5em 1em 0;
    }

    .logo {
        position: relative;
        display: inline-block;
        padding: .3em 1em 0;

    }

    .logo::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #91081b linear-gradient(hsla(231, 78%, 32%, 0.6), hsla(0, 0%, 100%, 0)) !important;
        border: 1px solid rgba(0, 0, 0, .4);
        border-bottom: none;
        border-radius: .5em .5em 0 0;
        box-shadow: 0 .15em white inset;
        transform: perspective(.5em) rotateX(5deg);
        transform-origin: bottom;
    }
</style>