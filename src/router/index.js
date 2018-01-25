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
      name: 'HomePage',
      component: lazyLoad('HomePage'),
      meta: {
        requiresAuth: true,
        title: 'ЕДДС'
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: lazyLoad('LoginPage'),
      meta: {
        title: 'Авторизация'
      }
    },
    {
      path: '/companies',
      name: 'CompanyList',
      component: lazyLoad('company/CompanyList'),
      meta: {
        requiresAuth: true,
        title: 'Список организаций'
      }
    },
    {
      path: '/company/:id',
      name: 'CompanyItem',
      component: lazyLoad('company/CompanyItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр организации'
      }
    },
    {
      path: '/contacts',
      name: 'ContactList',
      component: lazyLoad('contact/ContactList'),
      meta: {
        requiresAuth: true,
        title: 'Список контактов'
      }
    },
    {
      path: '/contact/:id',
      name: 'ContactItem',
      component: lazyLoad('contact/ContactItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр контакта'
      }
    },
    {
      path: '/departments',
      name: 'DepartmentList',
      component: lazyLoad('department/DepartmentList'),
      meta: {
        requiresAuth: true,
        title: 'Список отделов'
      }
    },
    {
      path: '/department/:id',
      name: 'DepartmentItem',
      component: lazyLoad('department/DepartmentItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр отдела'
      }
    },
    {
      path: '/educations',
      name: 'EducationList',
      component: lazyLoad('education/EducationList'),
      meta: {
        requiresAuth: true,
        title: 'Список обучений в УМЦ'
      }
    },
    {
      path: '/education/:id',
      name: 'EducationItem',
      component: lazyLoad('education/EducationItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр обучения в УМЦ'
      }
    },
    {
      path: '/kinds',
      name: 'KindList',
      component: lazyLoad('kind/KindList'),
      meta: {
        requiresAuth: true,
        title: 'Список типов тренировок'
      }
    },
    {
      path: '/kind/:id',
      name: 'KindItem',
      component: lazyLoad('kind/KindItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр типа тренировки'
      }
    },
    {
      path: '/posts',
      name: 'PostList',
      component: lazyLoad('post/PostList'),
      meta: {
        requiresAuth: true,
        title: 'Список должностей'
      }
    },
    {
      path: '/post/:id',
      name: 'PostItem',
      component: lazyLoad('post/PostItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр должности'
      }
    },
    {
      path: '/practices',
      name: 'PracticeList',
      component: lazyLoad('practice/PracticeList'),
      meta: {
        requiresAuth: true,
        title: 'Список тренировок в организациях'
      }
    },
    {
      path: '/practice/:id',
      name: 'PracticeItem',
      component: lazyLoad('practice/PracticeItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр тренировки'
      }
    },
    {
      path: '/ranks',
      name: 'RankList',
      component: lazyLoad('rank/RankList'),
      meta: {
        requiresAuth: true,
        title: 'Список чинов'
      }
    },
    {
      path: '/rank/:id',
      name: 'RankItem',
      component: lazyLoad('rank/RankItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр чина'
      }
    },
    {
      path: '/scopes',
      name: 'ScopeList',
      component: lazyLoad('scope/ScopeList'),
      meta: {
        requiresAuth: true,
        title: 'Список сфер деятельности'
      }
    },
    {
      path: '/scope/:id',
      name: 'ScopeItem',
      component: lazyLoad('scope/ScopeItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр сферы деятельности'
      }
    },
    {
      path: '/sirentypes',
      name: 'SirenTypeList',
      component: lazyLoad('sirentype/SirenTypeList'),
      meta: {
        requiresAuth: true,
        title: 'Список типов сирен'
      }
    },
    {
      path: '/sirentype/:id',
      name: 'SirenTypeItem',
      component: lazyLoad('sirentype/SirenTypeItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр типа сирены'
      }
    },
    {
      path: '/sirens',
      name: 'SirenList',
      component: lazyLoad('siren/SirenList'),
      meta: {
        requiresAuth: true,
        title: 'Список сирен'
      }
    },
    {
      path: '/siren/:id',
      name: 'SirenItem',
      component: lazyLoad('siren/SirenItem'),
      meta: {
        requiresAuth: true,
        title: 'Просмотр сирены'
      }
    },
    {
      path: '/certificates',
      name: 'CertificateList',
      component: lazyLoad('certificate/CertificateList'),
      meta: {
        requiresAuth: true,
        title: 'Список удостоверений'
      }
    },
    {
      path: '/certificate/:id',
      name: 'CertificateItem',
      component: lazyLoad('certificate/CertificateItem'),
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
