import Vue from 'vue'
import App from './App'
import router from './router'
// import http from './http'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let isAuth = store.getters.isAuth
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuth) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

Vue.axios.defaults.headers.common['Authorization'] = store.getters.getToken

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
