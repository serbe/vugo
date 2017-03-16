import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Companies from '@/components/Companies'
import Company from '@/components/Company'

import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies
    },
    {
      path: '/company/:id',
      name: 'company',
      component: Company
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
