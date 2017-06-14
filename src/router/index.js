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
      name: 'home',
      component: require('@/components/Home'),
      meta: {title: 'ЕДДС'}
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login'),
      meta: {title: 'Авторизация'}
    },
    {
      path: '/companies',
      name: 'companies',
      component: require('@/components/company/Companies'),
      meta: {requiresAuth: true, title: 'Список организаций'}
    },
    {
      path: '/company/:id',
      name: 'company',
      component: require('@/components/company/Company'),
      meta: {requiresAuth: true, title: 'Просмотр организации'}
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: require('@/components/contact/Contacts'),
      meta: {requiresAuth: true, title: 'Список контактов'}
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: require('@/components/contact/Contact'),
      meta: {requiresAuth: true, title: 'Просмотр контакта'}
    },
    {
      path: '/departments',
      name: 'departments',
      component: require('@/components/department/Departments'),
      meta: {requiresAuth: true, title: 'Список отделов'}
    },
    {
      path: '/department/:id',
      name: 'department',
      component: require('@/components/department/Department'),
      meta: {requiresAuth: true, title: 'Просмотр отдела'}
    },
    {
      path: '/educations',
      name: 'educations',
      component: require('@/components/education/Educations'),
      meta: {requiresAuth: true, title: 'Список обучений в УМЦ'}
    },
    {
      path: '/education/:id',
      name: 'education',
      component: require('@/components/education/Education'),
      meta: {requiresAuth: true, title: 'Просмотр обучения в УМЦ'}
    },
    {
      path: '/kinds',
      name: 'kinds',
      component: require('@/components/kind/Kinds'),
      meta: {requiresAuth: true, title: 'Список типов тренировок'}
    },
    {
      path: '/kind/:id',
      name: 'kind',
      component: require('@/components/kind/Kind'),
      meta: {requiresAuth: true, title: 'Просмотр типа тренировки'}
    },
    {
      path: '/posts',
      name: 'posts',
      component: require('@/components/post/Posts'),
      meta: {requiresAuth: true, title: 'Список должностей'}
    },
    {
      path: '/post/:id',
      name: 'post',
      component: require('@/components/post/Post'),
      meta: {requiresAuth: true, title: 'Просмотр должности'}
    },
    {
      path: '/practices',
      name: 'practices',
      component: require('@/components/practice/Practices'),
      meta: {requiresAuth: true, title: 'Список тренировок в организациях'}
    },
    {
      path: '/practice/:id',
      name: 'practice',
      component: require('@/components/practice/Practice'),
      meta: {requiresAuth: true, title: 'Просмотр тренировки'}
    },
    {
      path: '/ranks',
      name: 'ranks',
      component: require('@/components/rank/Ranks'),
      meta: {requiresAuth: true, title: 'Список чинов'}
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: require('@/components/rank/Rank'),
      meta: {requiresAuth: true, title: 'Просмотр чина'}
    },
    {
      path: '/scopes',
      name: 'scopes',
      component: require('@/components/scope/Scopes'),
      meta: {requiresAuth: true, title: 'Список сфер деятельности'}
    },
    {
      path: '/scope/:id',
      name: 'scope',
      component: require('@/components/scope/Scope'),
      meta: {requiresAuth: true, title: 'Просмотр сферы деятельности'}
    },
    {
      path: '*',
      name: 'error',
      component: require('@/components/NotFoundComponent')
    }
  ]
})

export default router
