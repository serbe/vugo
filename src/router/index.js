import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Contacts from '@/components/contact/Contacts'
import Contact from '@/components/contact/Contact'
import Companies from '@/components/company/Companies'
import Company from '@/components/company/Company'
import Educations from '@/components/education/Educations'
import Education from '@/components/education/Education'

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
      path: '/educations',
      name: 'educations',
      component: Educations
    },
    {
      path: '/education/:id',
      name: 'education',
      component: Education
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
