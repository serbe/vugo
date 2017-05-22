import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'
import store from './store'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  http,
  store,
  render: h => h(App)
}).$mount('#app')
