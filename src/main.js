import Vue from 'vue'
import App from './App'
import router from './router'
import auth from './auth'

require('./assets/sass/main.scss')
require('./assets/css/main.css')

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.title)) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isAuth()) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  methods: {
    checkAuth () {
      // some code
    }
  },
  mounted: function () {
    this.checkAuth()
  },
  render: h => h(App)
})
