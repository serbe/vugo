import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Contacts from '@/components/contact/Contacts'
import Contact from '@/components/contact/Contact'
import Companies from '@/components/company/Companies'
import Company from '@/components/company/Company'

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
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: Contact
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
