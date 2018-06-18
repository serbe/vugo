import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/views/HomePage";
import LoginPage from "@/views/LoginPage";
import CompanyList from "@/views/company/CompanyList";
import CompanyItem from "@/views/certificate/CertificateItem";
import ContactList from "@/views/contact/ContactList";
import ContactItem from "@/views/contact/ContactItem";
import DepartmentList from "@/views/department/DepartmentList";
import DepartmentItem from "@/views/department/DepartmentItem";
import EducationList from "@/views/education/EducationList";
import EducationItem from "@/views/education/EducationItem";
import KindList from "@/views/kind/KindList";
import KindItem from "@/views/kind/KindItem";
import PostList from "@/views/post/PostList";
import PostItem from "@/views/post/PostItem";
import PracticeList from "@/views/practice/PracticeList";
import PracticeItem from "@/views/practice/PracticeItem";
import RankList from "@/views/rank/RankList";
import RankItem from "@/views/rank/RankItem";
import ScopeList from "@/views/scope/ScopeList";
import ScopeItem from "@/views/scope/ScopeItem";
import SirenTypeList from "@/views/sirentype/SirenTypeList";
import SirenTypeItem from "@/views/sirentype/SirenTypeItem";
import SirenList from "@/views/siren/SirenList";
import SirenItem from "@/views/siren/SirenItem";
import CertificateList from "@/views/certificate/CertificateList";
import CertificateItem from "@/views/certificate/CertificateItem";
import NotFoundComponent from "@/views/NotFoundComponent";

Vue.use(Router);

export default new Router({
  hashbang: false,
  linkActiveClass: "is-active",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
      meta: {
        requiresAuth: true,
        title: "ЕДДС"
      }
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
      meta: {
        title: "Авторизация",
        auth: false
      }
    },
    {
      path: "/companies",
      name: "CompanyList",
      component: CompanyList,
      meta: {
        requiresAuth: true,
        title: "Список организаций"
      }
    },
    {
      path: "/company/:id",
      name: "CompanyItem",
      component: CompanyItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр организации"
      }
    },
    {
      path: "/contacts",
      name: "ContactList",
      component: ContactList,
      meta: {
        requiresAuth: true,
        title: "Список контактов"
      }
    },
    {
      path: "/contact/:id",
      name: "ContactItem",
      component: ContactItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр контакта"
      }
    },
    {
      path: "/departments",
      name: "DepartmentList",
      component: DepartmentList,
      meta: {
        requiresAuth: true,
        title: "Список отделов"
      }
    },
    {
      path: "/department/:id",
      name: "DepartmentItem",
      component: DepartmentItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр отдела"
      }
    },
    {
      path: "/educations",
      name: "EducationList",
      component: EducationList,
      meta: {
        requiresAuth: true,
        title: "Список обучений в УМЦ"
      }
    },
    {
      path: "/education/:id",
      name: "EducationItem",
      component: EducationItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр обучения в УМЦ"
      }
    },
    {
      path: "/kinds",
      name: "KindList",
      component: KindList,
      meta: {
        requiresAuth: true,
        title: "Список типов тренировок"
      }
    },
    {
      path: "/kind/:id",
      name: "KindItem",
      component: KindItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр типа тренировки"
      }
    },
    {
      path: "/posts",
      name: "PostList",
      component: PostList,
      meta: {
        requiresAuth: true,
        title: "Список должностей"
      }
    },
    {
      path: "/post/:id",
      name: "PostItem",
      component: PostItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр должности"
      }
    },
    {
      path: "/practices",
      name: "PracticeList",
      component: PracticeList,
      meta: {
        requiresAuth: true,
        title: "Список тренировок в организациях"
      }
    },
    {
      path: "/practice/:id",
      name: "PracticeItem",
      component: PracticeItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр тренировки"
      }
    },
    {
      path: "/ranks",
      name: "RankList",
      component: RankList,
      meta: {
        requiresAuth: true,
        title: "Список чинов"
      }
    },
    {
      path: "/rank/:id",
      name: "RankItem",
      component: RankItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр чина"
      }
    },
    {
      path: "/scopes",
      name: "ScopeList",
      component: ScopeList,
      meta: {
        requiresAuth: true,
        title: "Список сфер деятельности"
      }
    },
    {
      path: "/scope/:id",
      name: "ScopeItem",
      component: ScopeItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр сферы деятельности"
      }
    },
    {
      path: "/sirentypes",
      name: "SirenTypeList",
      component: SirenTypeList,
      meta: {
        requiresAuth: true,
        title: "Список типов сирен"
      }
    },
    {
      path: "/sirentype/:id",
      name: "SirenTypeItem",
      component: SirenTypeItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр типа сирены"
      }
    },
    {
      path: "/sirens",
      name: "SirenList",
      component: SirenList,
      meta: {
        requiresAuth: true,
        title: "Список сирен"
      }
    },
    {
      path: "/siren/:id",
      name: "SirenItem",
      component: SirenItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр сирены"
      }
    },
    {
      path: "/certificates",
      name: "CertificateList",
      component: CertificateList,
      meta: {
        requiresAuth: true,
        title: "Список удостоверений"
      }
    },
    {
      path: "/certificate/:id",
      name: "CertificateItem",
      component: CertificateItem,
      meta: {
        requiresAuth: true,
        title: "Просмотр удостоверения"
      }
    },
    {
      path: "*",
      name: "error",
      component: NotFoundComponent
    }
  ]
});
