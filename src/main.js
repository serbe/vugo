import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  http,
  store,
  render: h => h(App)
}).$mount('#app')
