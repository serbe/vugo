import Vue from 'vue'
import App from './App'
import router from './router'
// import auth from './auth'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

require('./assets/sass/main.scss')
require('./assets/css/main.css')

// auth.checkAuth()

Vue.use(VueAxios, axios)

if (process.env.NODE_ENV === 'development') {
  Vue.axios.defaults.baseURL = 'http://localhost:9090/edds/api/'
} else {
  Vue.axios.defaults.baseURL = '/edds/api/'
}

// Vue.config.productionTip = false

Vue.router = router

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.title)) {
//     document.title = to.meta.title
//   }
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!auth.isAuth()) {
//       if (to.name !== 'login') {
//         auth.right_page = to.name
//       }
//       next({
//         path: '/login'
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
})

// Vue.axios.post(...).then(res => {
//   console.log('RES', res)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
