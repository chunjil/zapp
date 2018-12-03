import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@state/store'
import './plugins/element.js'
import VueCookie from 'vue-cookie'
import '@components/_globals'
import '@design'
import V_Echarts from 'vue-echarts-directive';
Vue.directive('echarts',V_Echarts);


Vue.use(VueCookie);

Vue.config.productionTip = false

new Vue({
  router,
    store,
  render: h => h(App)
}).$mount('#app')
