<template>
    <div class="pager-container">
        <header class="page-header">
            <el-row>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" class="nav-container">
                    <slot name="logo"></slot>
                </el-col>
                <el-col :xs="8" :sm="12" :md="16" :lg="18">
                    <slot name="nav"></slot>
                </el-col>
            </el-row>
        </header>
        <main>
            <slot></slot>
        </main>
    <!--    <footer>
            <slot name="footer">
                @Right
            </slot>
        </footer>-->
    </div>
</template>

<script>

    export default {
        name: "page"
    }
</script>

<style type="scss" scoped>


    .pager-container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .pager-header {
        flex: 1;
        height: 60px;
    }
    main{
        height: auto;
        flex: auto;
    }
</style>