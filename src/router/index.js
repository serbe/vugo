import Vue from 'vue'
import Router from 'vue-router'

const lazyLoad = (path) => () => import(`@/components/${path}`)

Vue.use(Router)

export default new Router({
  hashbang: false,
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: lazyLoad('Home'),
      meta: {
        requiresAuth: true,
        title: 'ЕДДС'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: lazyLoad('Login'),
      meta: {
        title: 'Авторизация'
      }
    },
    {
      path: '/companies',
      name: 'companies',
      component: lazyLoad('company/Companies'),
      meta: {
        requiresAuth: true,
        title: 'Список организаций'
      }
    },
    {
      path: '/company/:id',
      name: 'company',
      component: lazyLoad('company/Company'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр организации'
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: lazyLoad('contact/Contacts'),
      meta: {
        requiresAuth: true,
        title: 'Список контактов'
      }
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: lazyLoad('contact/Contact'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр контакта'
      }
    },
    {
      path: '/departments',
      name: 'departments',
      component: lazyLoad('department/Departments'),
      meta: {
        requiresAuth: true,
        title: 'Список отделов'
      }
    },
    {
      path: '/department/:id',
      name: 'department',
      component: lazyLoad('department/Department'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр отдела'
      }
    },
    {
      path: '/educations',
      name: 'educations',
      component: lazyLoad('education/Educations'),
      meta: {
        requiresAuth: true,
        title: 'Список обучений в УМЦ'
      }
    },
    {
      path: '/education/:id',
      name: 'education',
      component: lazyLoad('education/Education'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр обучения в УМЦ'
      }
    },
    {
      path: '/kinds',
      name: 'kinds',
      component: lazyLoad('kind/Kinds'),
      meta: {
        requiresAuth: true,
        title: 'Список типов тренировок'
      }
    },
    {
      path: '/kind/:id',
      name: 'kind',
      component: lazyLoad('kind/Kind'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр типа тренировки'
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: lazyLoad('post/Posts'),
      meta: {
        requiresAuth: true,
        title: 'Список должностей'
      }
    },
    {
      path: '/post/:id',
      name: 'post',
      component: lazyLoad('post/Post'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр должности'
      }
    },
    {
      path: '/practices',
      name: 'practices',
      component: lazyLoad('practice/Practices'),
      meta: {
        requiresAuth: true,
        title: 'Список тренировок в организациях'
      }
    },
    {
      path: '/practice/:id',
      name: 'practice',
      component: lazyLoad('practice/Practice'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр тренировки'
      }
    },
    {
      path: '/ranks',
      name: 'ranks',
      component: lazyLoad('rank/Ranks'),
      meta: {
        requiresAuth: true,
        title: 'Список чинов'
      }
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: lazyLoad('rank/Rank'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр чина'
      }
    },
    {
      path: '/scopes',
      name: 'scopes',
      component: lazyLoad('scope/Scopes'),
      meta: {
        requiresAuth: true,
        title: 'Список сфер деятельности'
      }
    },
    {
      path: '/scope/:id',
      name: 'scope',
      component: lazyLoad('scope/Scope'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр сферы деятельности'
      }
    },
    {
      path: '/sirentypes',
      name: 'sirentypes',
      component: lazyLoad('sirentype/SirenTypes'),
      meta: {
        requiresAuth: true,
        title: 'Список типов сирен'
      }
    },
    {
      path: '/sirentype/:id',
      name: 'sirentype',
      component: lazyLoad('sirentype/SirenType'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр типа сирены'
      }
    },
    {
      path: '/sirens',
      name: 'sirens',
      component: lazyLoad('siren/Sirens'),
      meta: {
        requiresAuth: true,
        title: 'Список сирен'
      }
    },
    {
      path: '/siren/:id',
      name: 'siren',
      component: lazyLoad('siren/Siren'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр сирены'
      }
    },
    {
      path: '/certificates',
      name: 'certificates',
      component: lazyLoad('certificate/Certificates'),
      meta: {
        requiresAuth: true,
        title: 'Список удостоверений'
      }
    },
    {
      path: '/certificate/:id',
      name: 'certificate',
      component: lazyLoad('certificate/Certificate'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр удостоверения'
      }
    },
    {
      path: '*',
      name: 'error',
      component: lazyLoad('NotFoundComponent')
    }
  ]
})
