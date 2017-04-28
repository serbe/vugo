import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Companies from '@/components/company/Companies'
import Company from '@/components/company/Company'
import Contacts from '@/components/contact/Contacts'
import Contact from '@/components/contact/Contact'
import Departments from '@/components/department/Departments'
import Department from '@/components/department/Department'
import Educations from '@/components/education/Educations'
import Education from '@/components/education/Education'
import Kinds from '@/components/kind/Kinds'
import Kind from '@/components/kind/Kind'
import Posts from '@/components/post/Posts'
import Post from '@/components/post/Post'
import Practices from '@/components/practice/Practices'
import Practice from '@/components/practice/Practice'
import Ranks from '@/components/rank/Ranks'
import Rank from '@/components/rank/Rank'
import Scopes from '@/components/scope/Scopes'
import Scope from '@/components/scope/Scope'

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
      path: '/departments',
      name: 'departments',
      component: Departments
    },
    {
      path: '/department/:id',
      name: 'department',
      component: Department
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
      path: '/kinds',
      name: 'kinds',
      component: Kinds
    },
    {
      path: '/kind/:id',
      name: 'kind',
      component: Kind
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/practices',
      name: 'practices',
      component: Practices
    },
    {
      path: '/practice/:id',
      name: 'practice',
      component: Practice
    },
    {
      path: '/ranks',
      name: 'ranks',
      component: Ranks
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: Rank
    },
    {
      path: '/scopes',
      name: 'scopes',
      component: Scopes
    },
    {
      path: '/scope/:id',
      name: 'scope',
      component: Scope
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
