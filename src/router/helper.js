 //component: () => import('@views/my-view')
 export const lazyLoadView =AsyncView => {
    const AsyncHandler = () => ({
        component: AsyncView,
        loading: require('./views/_loading').default,
        delay: 400,
        error: require('./views/_timeout').default,
        timeout: 10000,
    })
    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children)
        },
    })
}