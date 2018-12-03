<template>
    <header>
        <div class="app-logo">
            <slot name="app-logo"></slot>
        </div>
        <div class="app-nav">
            <slot name="app-nav"></slot>
        </div>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer>
        <slot name="footer"></slot>
    </footer>
</template>

<script>
    export default {
        name: "main"
    }
</script>

<style scoped>

</style>