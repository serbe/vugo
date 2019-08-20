import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

Vue.use(Router);

let router = new Router({
  linkActiveClass: "is-active",
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () =>
        import(/* webpackChunkName: "HomePage" */ "./views/HomePage.vue"),
      meta: {
        requiresAuth: true,
        title: "ЕДДС"
      }
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () =>
        import(/* webpackChunkName: "LoginPage" */ "./views/LoginPage.vue"),
      meta: {
        title: "Авторизация",
        auth: false
      }
    },
    {
      path: "/companys",
      name: "CompanyList",
      component: () =>
        import(/* webpackChunkName: "CompanyList" */ "./views/company/CompanyList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список организаций"
      }
    },
    {
      path: "/company/:id",
      name: "CompanyItem",
      component: () =>
        import(/* webpackChunkName: "CompanyItem" */ "./views/company/CompanyItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр организации"
      }
    },
    {
      path: "/contacts",
      name: "ContactList",
      component: () =>
        import(/* webpackChunkName: "ContactList" */ "./views/contact/ContactList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список контактов"
      }
    },
    {
      path: "/contact/:id",
      name: "ContactItem",
      component: () =>
        import(/* webpackChunkName: "ContactItem" */ "./views/contact/ContactItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр контакта"
      }
    },
    {
      path: "/departments",
      name: "DepartmentList",
      component: () =>
        import(/* webpackChunkName: "DepartmentList" */ "./views/department/DepartmentList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список отделов"
      }
    },
    {
      path: "/department/:id",
      name: "DepartmentItem",
      component: () =>
        import(/* webpackChunkName: "DepartmentItem" */ "./views/department/DepartmentItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр отдела"
      }
    },
    {
      path: "/educations",
      name: "EducationList",
      component: () =>
        import(/* webpackChunkName: "EducationList" */ "./views/education/EducationList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список обучений в УМЦ"
      }
    },
    {
      path: "/education/:id",
      name: "EducationItem",
      component: () =>
        import(/* webpackChunkName: "EducationItem" */ "./views/education/EducationItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр обучения в УМЦ"
      }
    },
    {
      path: "/kinds",
      name: "KindList",
      component: () =>
        import(/* webpackChunkName: "KindList" */ "./views/kind/KindList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список типов тренировок"
      }
    },
    {
      path: "/kind/:id",
      name: "KindItem",
      component: () =>
        import(/* webpackChunkName: "KindItem" */ "./views/kind/KindItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр типа тренировки"
      }
    },
    {
      path: "/posts",
      name: "PostList",
      component: () =>
        import(/* webpackChunkName: "PostList" */ "./views/post/PostList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список должностей"
      }
    },
    {
      path: "/post/:id",
      name: "PostItem",
      component: () =>
        import(/* webpackChunkName: "PostItem" */ "./views/post/PostItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр должности"
      }
    },
    {
      path: "/practices",
      name: "PracticeList",
      component: () =>
        import(/* webpackChunkName: "PracticeList" */ "./views/practice/PracticeList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список тренировок в организациях"
      }
    },
    {
      path: "/practice/:id",
      name: "PracticeItem",
      component: () =>
        import(/* webpackChunkName: "PracticeItem" */ "./views/practice/PracticeItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр тренировки"
      }
    },
    {
      path: "/ranks",
      name: "RankList",
      component: () =>
        import(/* webpackChunkName: "RankList" */ "./views/rank/RankList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список чинов"
      }
    },
    {
      path: "/rank/:id",
      name: "RankItem",
      component: () =>
        import(/* webpackChunkName: "RankItem" */ "./views/rank/RankItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр чина"
      }
    },
    {
      path: "/scopes",
      name: "ScopeList",
      component: () =>
        import(/* webpackChunkName: "ScopeList" */ "./views/scope/ScopeList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список сфер деятельности"
      }
    },
    {
      path: "/scope/:id",
      name: "ScopeItem",
      component: () =>
        import(/* webpackChunkName: "ScopeItem" */ "./views/scope/ScopeItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр сферы деятельности"
      }
    },
    {
      path: "/sirentypes",
      name: "SirenTypeList",
      component: () =>
        import(/* webpackChunkName: "SirenTypeList" */ "./views/sirentype/SirenTypeList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список типов сирен"
      }
    },
    {
      path: "/sirentype/:id",
      name: "SirenTypeItem",
      component: () =>
        import(/* webpackChunkName: "SirenTypeItem" */ "./views/sirentype/SirenTypeItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр типа сирены"
      }
    },
    {
      path: "/sirens",
      name: "SirenList",
      component: () =>
        import(/* webpackChunkName: "SirenList" */ "./views/siren/SirenList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список сирен"
      }
    },
    {
      path: "/siren/:id",
      name: "SirenItem",
      component: () =>
        import(/* webpackChunkName: "SirenItem" */ "./views/siren/SirenItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр сирены"
      }
    },
    {
      path: "/certificates",
      name: "CertificateList",
      component: () =>
        import(/* webpackChunkName: "CertificateList" */ "./views/certificate/CertificateList.vue"),
      meta: {
        requiresAuth: true,
        title: "Список удостоверений"
      }
    },
    {
      path: "/certificate/:id",
      name: "CertificateItem",
      component: () =>
        import(/* webpackChunkName: "CertificateItem" */ "./views/certificate/CertificateItem.vue"),
      meta: {
        requiresAuth: true,
        title: "Просмотр удостоверения"
      }
    },
    {
      path: "*",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "NotFoundComponent" */ "./views/NotFoundComponent.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   store.dispatch("add_from", from.path);
//   if (to.matched.some(record => record.meta.title)) {
//     document.title = to.meta.title;
//   }
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!auth.isAuth()) {
//       if (to.name !== "login") {
//         auth.right_page = to.name;
//       }
//       next({
//         path: "/login"
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
