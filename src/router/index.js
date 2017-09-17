import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Companies from '@/components/company/Companies';
import Company from '@/components/company/Company';
import Contacts from '@/components/contact/Contacts';
import Contact from '@/components/contact/Contact';
import Departments from '@/components/department/Departments';
import Department from '@/components/department/Department';
import Educations from '@/components/education/Educations';
import Education from '@/components/education/Education';
import Kinds from '@/components/kind/Kinds';
import Kind from '@/components/kind/Kind';
import Posts from '@/components/post/Posts';
import Post from '@/components/post/Post';
import Practices from '@/components/practice/Practices';
import Practice from '@/components/practice/Practice';
import Ranks from '@/components/rank/Ranks';
import Rank from '@/components/rank/Rank';
import Scopes from '@/components/scope/Scopes';
import Scope from '@/components/scope/Scope';
import SirenTypes from '@/components/sirentype/SirenTypes';
import SirenType from '@/components/sirentype/SirenType';
import Sirens from '@/components/siren/Sirens';
import Siren from '@/components/siren/Siren';
import Certificates from '@/components/certificate/Certificates';
import Certificate from '@/components/certificate/Certificate';
import NotFoundComponent from '@/components/NotFoundComponent';

Vue.use(Router);

const router = new Router({
  hashbang: false,
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true, title: 'ЕДДС' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Авторизация' },
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies,
      meta: { requiresAuth: true, title: 'Список организаций' },
    },
    {
      path: '/company/:id',
      name: 'company',
      component: Company,
      meta: { requiresAuth: true, title: 'Просмотр организации' },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      meta: { requiresAuth: true, title: 'Список контактов' },
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: Contact,
      meta: { requiresAuth: true, title: 'Просмотр контакта' },
    },
    {
      path: '/departments',
      name: 'departments',
      component: Departments,
      meta: { requiresAuth: true, title: 'Список отделов' },
    },
    {
      path: '/department/:id',
      name: 'department',
      component: Department,
      meta: { requiresAuth: true, title: 'Просмотр отдела' },
    },
    {
      path: '/educations',
      name: 'educations',
      component: Educations,
      meta: { requiresAuth: true, title: 'Список обучений в УМЦ' },
    },
    {
      path: '/education/:id',
      name: 'education',
      component: Education,
      meta: { requiresAuth: true, title: 'Просмотр обучения в УМЦ' },
    },
    {
      path: '/kinds',
      name: 'kinds',
      component: Kinds,
      meta: { requiresAuth: true, title: 'Список типов тренировок' },
    },
    {
      path: '/kind/:id',
      name: 'kind',
      component: Kind,
      meta: { requiresAuth: true, title: 'Просмотр типа тренировки' },
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
      meta: { requiresAuth: true, title: 'Список должностей' },
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post,
      meta: { requiresAuth: true, title: 'Просмотр должности' },
    },
    {
      path: '/practices',
      name: 'practices',
      component: Practices,
      meta: { requiresAuth: true, title: 'Список тренировок в организациях' },
    },
    {
      path: '/practice/:id',
      name: 'practice',
      component: Practice,
      meta: { requiresAuth: true, title: 'Просмотр тренировки' },
    },
    {
      path: '/ranks',
      name: 'ranks',
      component: Ranks,
      meta: { requiresAuth: true, title: 'Список чинов' },
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: Rank,
      meta: { requiresAuth: true, title: 'Просмотр чина' },
    },
    {
      path: '/scopes',
      name: 'scopes',
      component: Scopes,
      meta: { requiresAuth: true, title: 'Список сфер деятельности' },
    },
    {
      path: '/scope/:id',
      name: 'scope',
      component: Scope,
      meta: { requiresAuth: true, title: 'Просмотр сферы деятельности' },
    },
    {
      path: '/sirentypes',
      name: 'sirentypes',
      component: SirenTypes,
      meta: { requiresAuth: true, title: 'Список типов сирен' },
    },
    {
      path: '/sirentype/:id',
      name: 'sirentype',
      component: SirenType,
      meta: { requiresAuth: true, title: 'Просмотр типа сирены' },
    },
    {
      path: '/sirens',
      name: 'sirens',
      component: Sirens,
      meta: { requiresAuth: true, title: 'Список сирен' },
    },
    {
      path: '/siren/:id',
      name: 'siren',
      component: Siren,
      meta: { requiresAuth: true, title: 'Просмотр сирены' },
    },
    {
      path: '/certificates',
      name: 'certificates',
      component: Certificates,
      meta: { requiresAuth: true, title: 'Список удостоверений' },
    },
    {
      path: '/certificate/:id',
      name: 'certificate',
      component: Certificate,
      meta: { requiresAuth: true, title: 'Просмотр удостоверения' },
    },
    {
      path: '*',
      name: 'error',
      component: NotFoundComponent,
    },
  ],
});

export default router;
