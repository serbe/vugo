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
      component: require('@/components/Login'),
      meta: {auth: false}
    },
    {
      path: '/companies',
      name: 'companies',
      component: require('@/components/company/Companies')
    },
    {
      path: '/company/:id',
      name: 'company',
      component: require('@/components/company/Company')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: require('@/components/contact/Contacts')
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: require('@/components/contact/Contact')
    },
    {
      path: '/departments',
      name: 'departments',
      component: require('@/components/department/Departments')
    },
    {
      path: '/department/:id',
      name: 'department',
      component: require('@/components/department/Department')
    },
    {
      path: '/educations',
      name: 'educations',
      component: require('@/components/education/Educations')
    },
    {
      path: '/education/:id',
      name: 'education',
      component: require('@/components/education/Education')
    },
    {
      path: '/kinds',
      name: 'kinds',
      component: require('@/components/kind/Kinds')
    },
    {
      path: '/kind/:id',
      name: 'kind',
      component: require('@/components/kind/Kind')
    },
    {
      path: '/posts',
      name: 'posts',
      component: require('@/components/post/Posts')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: require('@/components/post/Post')
    },
    {
      path: '/practices',
      name: 'practices',
      component: require('@/components/practice/Practices')
    },
    {
      path: '/practice/:id',
      name: 'practice',
      component: require('@/components/practice/Practice')
    },
    {
      path: '/ranks',
      name: 'ranks',
      component: require('@/components/rank/Ranks')
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: require('@/components/rank/Rank')
    },
    {
      path: '/scopes',
      name: 'scopes',
      component: require('@/components/scope/Scopes')
    },
    {
      path: '/scope/:id',
      name: 'scope',
      component: require('@/components/scope/Scope')
    },
    {
      path: '*',
      name: 'error',
      component: require('@/components/NotFoundComponent')
    }
  ]
})

export default router
