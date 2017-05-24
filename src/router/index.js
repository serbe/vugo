import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  hashbang: false,
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home')
    },
    {
      path: '/login',
      name: 'Login',
      component: require('@/components/Login')
    },
    {
      path: '/companies',
      name: 'companies',
      component: require('@/components/company/Companies'),
      meta: {requiresAuth: true}
    },
    {
      path: '/company/:id',
      name: 'company',
      component: require('@/components/company/Company'),
      meta: {requiresAuth: true}
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: require('@/components/contact/Contacts'),
      meta: {requiresAuth: true}
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: require('@/components/contact/Contact'),
      meta: {requiresAuth: true}
    },
    {
      path: '/departments',
      name: 'departments',
      component: require('@/components/department/Departments'),
      meta: {requiresAuth: true}
    },
    {
      path: '/department/:id',
      name: 'department',
      component: require('@/components/department/Department'),
      meta: {requiresAuth: true}
    },
    {
      path: '/educations',
      name: 'educations',
      component: require('@/components/education/Educations'),
      meta: {requiresAuth: true}
    },
    {
      path: '/education/:id',
      name: 'education',
      component: require('@/components/education/Education'),
      meta: {requiresAuth: true}
    },
    {
      path: '/kinds',
      name: 'kinds',
      component: require('@/components/kind/Kinds'),
      meta: {requiresAuth: true}
    },
    {
      path: '/kind/:id',
      name: 'kind',
      component: require('@/components/kind/Kind'),
      meta: {requiresAuth: true}
    },
    {
      path: '/posts',
      name: 'posts',
      component: require('@/components/post/Posts'),
      meta: {requiresAuth: true}
    },
    {
      path: '/post/:id',
      name: 'post',
      component: require('@/components/post/Post'),
      meta: {requiresAuth: true}
    },
    {
      path: '/practices',
      name: 'practices',
      component: require('@/components/practice/Practices'),
      meta: {requiresAuth: true}
    },
    {
      path: '/practice/:id',
      name: 'practice',
      component: require('@/components/practice/Practice'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ranks',
      name: 'ranks',
      component: require('@/components/rank/Ranks'),
      meta: {requiresAuth: true}
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: require('@/components/rank/Rank'),
      meta: {requiresAuth: true}
    },
    {
      path: '/scopes',
      name: 'scopes',
      component: require('@/components/scope/Scopes'),
      meta: {requiresAuth: true}
    },
    {
      path: '/scope/:id',
      name: 'scope',
      component: require('@/components/scope/Scope'),
      meta: {requiresAuth: true}
    },
    {
      path: '*',
      name: 'error',
      component: require('@/components/NotFoundComponent')
    }
  ]
})

export default router
