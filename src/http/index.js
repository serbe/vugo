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
Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidVNlUiIsImFkbWluIjp0cnVlLCJleHAiOjE0OTU2MTQ3NTd9.3N_a1dY_Tt5PONx5XjPOHyeJM6X3L_iZTcyiehFv6wYk854F1nqSqQhmm0gTgB8FVkKbHvXcT6mY9OgMs_hcLQ'
