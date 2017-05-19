import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VueAuthBearer from '@websanova/vue-auth/drivers/auth/bearer'
import VueAuthHttp from '@websanova/vue-auth/drivers/http/axios.1.x'
import VueAuthRouter from '@websanova/vue-auth/drivers/router/vue-router.2.x'

Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: VueAuthBearer,
  http: VueAuthHttp,
  router: VueAuthRouter,
  authRedirect: {
    path: '/login'
  },
  logoutData: {
    redirect: '/login',
    makeRequest: true
  }
})

Vue.axios.defaults.baseURL = 'http://localhost:9090/'
