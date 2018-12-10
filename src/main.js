import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@state/store'
import './plugins/element.js'
import './plugins/echarts'
import '@components/_globals'


/*import VueCookie from 'vue-cookie'
Vue.use(VueCookie);*/

Vue.config.productionTip = false

new Vue({
  router,
    store,
  render: h => h(App)
}).$mount('#app')
