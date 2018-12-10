<script>
    const BaseLink = 'BaseLink'

    export default {
        // 函数型组件
        //https://cn.vuejs.org/v2/guide/render-function.html#函数式组件
        functional: true,
        props: {
            routes: {
                type: Array,
                required: true,
            },
        },
        render(h, {props, $style = {}}) {
            function getRouteTitle(route) {
                return typeof route.title === 'function' ? route.title() : route.title
            }

            return props.routes.map(route => (
                <BaseLink
            tag = "li"
            key = {route.name}
            to = {route}
            exact-active-class = {$style.active}
                >
                <a> {getRouteTitle(route)} </a>
                </BaseLink>
            ))
        },
    }
</script>

<style lang="scss" module>
    @import '@design/index.scss';

    .active a {
        font-weight: 600;
        color: $color-link-text-active;
        text-decoration: none;
        cursor: default;
    }
</style>
